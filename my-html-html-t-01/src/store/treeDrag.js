//求和相关的配置
export default {
	namespaced:true,
	actions:{
		
	},
	mutations:{
		FromDragStart(state,value){
			// console.log('mutations中的FromDragStart被调用了')
			// console.log('选中的key',value.node.eventKey)
            // console.log('选中的title',value.node.title)
            state.fromNodeKey = value.node.eventKey
            state.fromNodeTitle = value.node.title
		},
        // TargetDragDop(state,value){
        //     console.log('mutations中的TargetDragDop被调用了')
        //     console.log('目标的key',value.eventKey)
        //     console.log('目标的title',value.title)
		// 	console.log("onDrop", value);
		// 	let newMap = {
		// 		fromNodeKey: this.fromNodeKey,
		// 		fromNodeTitle: this.fromNodeTitle,
		// 	};
		// 	value.mappingList.push(newMap);

        // },
        AddSelectedNode(state,value){
            console.log('mutations中的AddSelectedNode被调用了')
            console.log('目标的',value)
        }
	},
	state:{
		fromNodeKey:"", 
		fromNodeTitle:'',
        selectedNode:{}
	},
	getters:{
		
	},
}