import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, updateDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { defineStore } from "pinia";
import { db, storage } from "../firebaseConfig";

export const useComputerStore = defineStore({
  id: "computerStore",
  state: () => ({
    computers: [],
    current_computer: null,
    loading: false,
    loadingDoc: false
  }),
  getters: {
    getLastId(store) {
      return (type) => {
        const ids = store.computers
          .filter(c => c.code.includes(type))
          .map(c => Number(c.code.substring(2)))
          .sort((a, b) => b - a);

        const [last_register_id] = ids

        return last_register_id || 1
      }
    }
  },
  actions: {
    async getComputers() {
      if (this.computers.length > 0) {
        return;
      }

      this.loading = true;
      this.computers = [];
      const q = query(collection(db, "computers"));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((computer) => {
          this.computers.push({
            id: computer.id,
            ...computer.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async setComputer(id) {
      if (this.current_computer && this.current_computer.id == id) {
        return;
      }

      this.loadingDoc = true;
      try {
        const docRef = doc(db, "computers", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("no existe la computadora");
        }

        this.current_computer = docSnap.data();
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDoc = false;
      }
    },

    async addComputer(computer, invoice_file) {
      this.loadingDoc = true;
      try {
        const id = this.getLastId(computer.computer_type);
        const computerRef = await addDoc(collection(db, "computers"), {
          ...computer,
          code: `${computer.computer_type}${id + 1}`,
          responsible: computer.responsible.id,
          responsible_name: computer.responsible.employee_name
        });

        const _computer = {
          ...computer,
          id: computerRef.id,
          code: `${computer.computer_type}${id + 1}`,
          responsible: computer.responsible.id,
          responsible_name: computer.responsible.employee_name,
          invoice_date: Timestamp.fromDate(computer.invoice_date),
          purchase_date: Timestamp.fromDate(computer.purchase_date),
          delivery_date: Timestamp.fromDate(computer.delivery_date),
        };

        if (invoice_file) {
          const storageRef = ref(
            storage,
            `invoices/computers/${computerRef.id}`
          );
          await uploadBytes(storageRef, invoice_file);
          const invoiceURL = await getDownloadURL(storageRef);
          await updateDoc(computerRef, {
            invoiceURL,
          });
          _computer.invoiceURL = invoiceURL;
        }

        this.computers.push(_computer);
      } catch (error) {
        console.log(error.code);
        return error.code;
      } finally {
        this.loadingDoc = false;
      }
    },
  }
})