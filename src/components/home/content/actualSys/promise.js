function timeout(ms) {
  return new Promise((resolve, reject) => {
    console.log("这里是会直接触发的");
    setTimeout(() => {
      console.log("我是第一个ajax的回调");
    }, ms);
    resolve("触发第二个ajax请求");
  })
}

timeout(3000).then((value) => {
  console.log(value);
  console.log("第二个ajax的回调");
}, (error) => {
  console.log(error);
})


function one() {
  this.$http.get("one", (result) => {
    console.log("第一个ajax");
  })
}

function two() {
  this.$http.get("two", (result) => {
    console.log("第二个ajax");
  })
}

function one2two() {
  return new Promise((resolve, reject) => {
    one()
  }).then(() => {
    two()
  })
}
