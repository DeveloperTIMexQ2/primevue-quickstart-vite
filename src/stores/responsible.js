import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { db } from "../firebaseConfig";


export const useResponsibleStore = defineStore({
  id: "responsibleStore",
  state: () => ({
    responsibles: [],
    current_responsible: null,
    loading: false,
    loadingDoc: false,
  }),
  actions: {
    async getResponsibles() {
      if (this.responsibles.length > 0) {
        return;
      }

      this.loading = true;
      this.responsibles = [];
      const q = query(collection(db, "responsibles"));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((responsible) => {
          this.responsibles.push({
            id: responsible.id,
            ...responsible.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async setResponsible(id) {
      if(this.current_responsible && this.current_responsible.id == id) {
        return;
      }

      this.loadingDoc = true;
      try {
        const docRef = doc(db, "responsibles", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("no existe el responsable");
        }

        this.current_responsible = docSnap.data();
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDoc = false;
      }
    },

    async addResponsible(responsible) {
      this.loadingDoc = true;
      try {
        const responsibleRef = await addDoc(collection(db, "responsibles"), responsible);
        this.responsibles.push({
          ...responsible,
          id: responsibleRef.id,
        });
      } catch (error) {
        console.log(error.code);
        return error.code;
      } finally {
        this.loadingDoc = false;
      }
    },
  },
});