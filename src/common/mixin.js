import { debounce } from './utils';

export const itemListenerMixin = {
        data() {
            return {
                itemListener: null
            }
        },
        mounted() {
            const refresh = debounce(this.$refs.scroll.refresh, 50)
            this.itemListener = () => {
                refresh()
            }
            this.$bus.$on('itemImgeLoad', this.itemListener)
            console.log('我是混入的内容');
        }
    }
    //回到顶部
export const backtop = {
    data() {
        return {
            isshow: false,
        }
    },
    methods: {
        backtop() {
            this.$refs.scroll.scrollTo(0, 0)
        },
    }
}