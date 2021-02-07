import Vue from 'vue'
import { Toast } from 'vant'
import Vuex, { createLogger } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        carList: []
    },
    getters: {
        carNum(state) {
            return state.carList.length
        },
    },
    mutations: {
        ADD_COUNTER(state, payload) {
            payload.count += 1
        },
        ADD_TO_CART(state, payload) {
            state.carList.push(payload)
        }

    },
    actions: {
        addCart(context, payload) {
            // let oldProduct = null;
            // for (let item of state.carList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item
            //     }
            // }
            // console.log(oldProduct);
            // if (oldProduct) {
            //     oldProduct.count += 1
            // } else {
            //     payload.count = 1
            //     state.carList.push(payload)
            // }
            return new Promise((resolve, reject) => {
                let oldProduct = context.state.carList.find(item => item.iid === payload.iid)
                if (oldProduct) {
                    context.commit('ADD_COUNTER', oldProduct)
                        // oldProduct.count += 1
                    resolve('商品+1')
                } else {
                    payload.count = 1
                    payload.checked = true
                    context.commit('ADD_TO_CART', payload)
                        // state.carList.push(payload)
                    resolve('添加商品成功!')
                }
            })
        }

    },
    modules: {}
})