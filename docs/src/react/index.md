# React

## 一、JSX语法规则

1. 定义虚拟dom时不用写引号

2. 标签中混入js表达式要用 {}

   ```jsx
   const vdom = (
       <ul>
           {
           	data.map((item, index)=>{
              		return <li key={index}>{item}</li> 
           	})
            }
       </ul>
   )
   ```

3. 标签class类名不能用class，要用className

4. 标签内联样式要用 {{}}

   ```jsx
   <div style={{color: 'red', fontSize: '20px'}}></div>
   ```

5. 只能有一个根标签

6. 标签必须闭合

7. 标签首字母

   - 以小写字母开头，则转化为 html5 中的同名元素，如果没有这个元素，就会报错
   - 以大写字母开头，会被当成一个自定义的组件

## 二、类组件

1. 定义

   ```jsx
   class MyComponent extends React.Component {
       render(){
           return <h2>我是用类定义的组件</h2>
       }
   }
   ```

   > - 类组件必须要继承 react 内置类 React.Component
   > - jsx 必须要写在 render 函数中，且要有返回值
   > - render方法是放在类的原型对象上，供实例使用
   > - render 方法中的 this 指向 new 出来的实例

2. 实例的三大属性

   1. state

      > 组件的状态，类似于 vue 中的响应式数据。

      ```jsx
      class MyComponent extends React.Component {
          constructor(props) {
              super(props)
      		// 初始化 state        
              this.state = { isHot: false, wind:'微风'}
        		// 改变事件处理函数中的this指向      
              // this.click = this.handleClick.bind(this)
          }
          
          render() {
              // 读取state 中的值
              const { isHot，wind} = this.state
              // 原生JS中的 onclick 事件，在 react 中要写成 onClick，其他同理
              return (
                  <div>
                      <h2>今天天气很{ isHot ? '炎热': '凉爽'}</h2>
                      <h2>{ wind }</h2>
                      <button onClick={this.handleClick}>更改</button>
                  </div>
              )
          }
          
          // ！！！注意：此处必须要用箭头函数，否则会改变this的指向
          handleClick = () => {
        		// 状态必须通过 setState 以对象的形式进行更新，且更新是一种合并，不是替换  
              const { wind } = this.state
              this.setState({ wind: '斜阳'})
          }
          
          // 若不使用箭头函数，可以在 constructor 中用 bind 重新指回 this
          handleClick() => {
        		// 更新state中的值      
             	const { wind } = this.state
              this.setState({ wind: '斜阳'})
          }
      }
      ```

   2. props

      > 通过标签属性从组件外向组件内传递变化的数据

      ```jsx
      // 直接传值
      <Person name="李华" age={18} sex="男" />
      // 或批量传值
      const obj = { name: "李华", age: 18, sex: "男"}
      <Person {...obj} />
      
      class Person extends React.Component {
          // 可省略
          constructor(props) {
              super(props)
          }
          
          render() {
              const { name, age, sex }= this.props
              return(
                  <ul>
                      <li>{ name }</li>
                  </ul>
              )
          }
      }
      ```

      - 组件标签的所有属性都以 { key:  value } 的形式保存在`props`中

      - 单向数据流，组件内部不要修改`props`数据

      - 限制 props 

        > 需要引入 prop-types 库

        1. 写在类外面

           ```jsx
           // 指定数据类型
           Person.propTypes = {
           			name:PropTypes.string.isRequired, //限制name必传，且为字符串
           			sex:PropTypes.string,//限制sex为字符串
           			age:PropTypes.number,//限制age为数值
           			speak:PropTypes.func,//限制speak为函数
           		}
           // 指定默认值
           Person.defaultProps = {
           	sex:'男',//sex默认值为男
           	age:18 //age默认值为18
           }
           
           class Person extends React.Component {
               // 可省略
               constructor(props) {
                   super(props)
               }
               
               render() {
                   const { name, age, sex }= this.props
                   return(
                       <ul>
                           <li>{ name }</li>
                           <li>{ age }</li>
                       </ul>
                   )
               }
           }
           ```

        2. 写在类里面

           ```jsx
           class Person extends React.Component {
               // 可省略
               constructor(props) {
                   super(props)
               }
               
               // 指定数据类型
               static propTypes = {
           				name:PropTypes.string.isRequired, //限制name必传，且为字符串
           				sex:PropTypes.string,//限制sex为字符串
           				age:PropTypes.number,//限制age为数值
           			}
           
           	// 指定默认值
           	static defaultProps = {
           				sex:'男',//sex默认值为男
           				age:18 //age默认值为18
           			}
           
               
               render() {
                   const { name, age, sex }= this.props
                   return(
                       <ul>
                           <li>{ name }</li>
                           <li>{ age }</li>
                       </ul>
                   )
               }
           }
           ```

   3. refs

      > 组件内的标签可以定义`ref`属性来标识自己（类似于 id)

      ```jsx
      class Demo extends React.Component {
          render() {
              // 字符串形式的 ref
              return(
                  <div>
                      <input ref="input1" type="text" />
                      <input ref="input2" type="text" />
                      <button onClick={this.handleClick}>点击</button>
                  </div>
              )
          }
          
          handleClick = () => {
              // refs 是一个数组，他收集了组件内的所有 ref。这里的 input1 
              const { input1, input2 } = this.refs
          }
      }
      ```

      **不推荐使用字符串形式的ref**

      - 推荐使用 createRef

        ```jsx
        class Demo extends React.Component {
            myRef1 = React.createRef()
            myRef2 = React.createRef()
            
            render() {
                return(
                    <div>
                        <input ref={myRef1} type="text" />
                        <input ref={myRef2} type="text" />
                        <button onClick={this.handleClick}>点击</button>
                    </div>
                )
            }
            
            handleClick = () => {
               console.log(this.myRef1.current.value)
            }
        }
        ```

        **`React.createRef`调用后可以返回一个容器，该容器可以存储被`ref`所标识的节点**

## 三、函数式组件

1. 定义

   ```jsx
   function MyComponent() {
       return <h2>我是一个函数式组件</h2>
   }
   ```

   **函数中的`this`指向`undefined`，因为babel编译后开启了严格模式**

2. props 属性