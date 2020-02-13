// 容器组件, 将redux中的状态以及行为操作通过props的形式传递给UI组件

import { connect } from "react-redux";
import {
  increment,
  decrement,
  incrementAsync
} from "../redux/actions/counter-action";
import counter from "../compnents/counter";

// function mapStateToProps (state) {
//   return {
//     count: state
//   }
// }

// const mapStateToProps = state => ({ count: state });

// redux的action传递给ui组件
// const mapDispatchToProps = dispatch => {
//   return {
//     increment: value => dispatch(increment(value)),
//     decrement: value => dispatch(decrement(value))
//   }
// }

// action通过props的方式传递给UI组件,那么{increment: ...}就是props
// 如果想直接传递increment,那是不行的,直接就会调用

/**
 * connect函数中第二个参数进行判断
 * 1. 如果是一个对象, 就自动加上上面的代码, 遍历对象, 然后给每个对象添加dispatch
 */

// const mapDispatchToProps = {
//   increment,
//   decrement
// };

// export default connect(mapStateToProps, mapDispatchToProps)(counter);

export default connect(state => ({ count: state.count, users: state.users }), {
  increment,
  decrement,
  incrementAsync
})(counter);

// react-redux内部实现的原理
// function connect (a, b) {
//   // 如果b为对象,遍历
//   let resultObj = {}
//   for(let key in b) {
//     resultObj[key] = value => dispatch(key(value))
//   }
// }
