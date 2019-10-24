var counter = "fin";
const Counter = require('../models/counter.models.js');
Counter.find({name: counter}).then((co)=>{
    let temp_count;
    let check = 0;
    if(co.length == 0){
        let t_count = new Counter({name: counter, counter: "1"});
        t_count.save().then(data => {
            console.log(data);
        }).catch((e)=>{
            console.log(e);
        })
        check = 1;
        temp_count = {name: counter, counter: "0"};
    } else {
        temp_count = co[0];
    }
    if(check == 0){
        temp_count.counter = (parseInt(temp_count.counter) + 1).toString();
        Counter.findByIdAndUpdate(temp_count._id, {name: temp_count.name, counter: temp_count.counter}, {new: true}).then((a)=>{
            console.log("A", a);
        }).catch((e)=>{
            console.log(e);
        })
    }

});