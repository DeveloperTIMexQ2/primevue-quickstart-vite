import { defineStore } from 'pinia'

export const useDialogStore = defineStore({
  id: 'dialogStore',
  state: () => ({
    displayComputerForm: false,
    displayResponsibleForm: false,
    displayResponsibleDetail: false,
    displayEditComputerForm: false,
  }),
  actions: {
    showComputerForm() {
      this.displayComputerForm = true
    },

    hideComputerForm() {
      this.displayComputerForm = false
    },

    showResponsibleForm() {
      this.displayResponsibleForm = true
    },

    hideResponsibleForm() {
      this.displayResponsibleForm = false
    },

    showResponsibleDetail() {
      this.displayResponsibleDetail = true
    },

    hideResponsibleDetail() {
      this.displayResponsibleDetail = false
    },

    showEditComputerForm() {
      this.displayEditComputerForm = true
    },

    hideEditComputerForm() {
      this.displayEditComputerForm = false
    },
  },
})
