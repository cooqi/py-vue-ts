import Vue from 'vue'
declare module '*.vue' {
  export default Vue
}


declare module 'vue/types/vue' {
    interface Vue {
        $Message: any,
        $api: any,
        $routeGo:any,
        $Modal:any,
        $ModalConfirm:any
    }
}