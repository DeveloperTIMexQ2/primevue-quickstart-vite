import { addDoc, collection, getDocs, query, updateDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { defineStore } from "pinia";
import { db, storage } from "../firebaseConfig";

export const useComputerStore = defineStore({
  id: "computerStore",
  state: () => ({
    computers: [],
    loading: false,
    loadingDoc: false
  }),
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
    async addComputer(computer, invoice_file) {
      this.loadingDoc = true;
      try {
        const computerRef = await addDoc(collection(db, "computers"), {
          ...computer,
          code: `MQ${this.computers.length + 1}`,
          responsible: computer.responsible.id,
          responsible_name: computer.responsible.employee_name
        });

        const _computer = {
          ...computer,
          id: computerRef.id,
          code: `MQ${this.computers.length + 1}`,
          responsible: computer.responsible.id,
          responsible_name: computer.responsible.employee_name
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