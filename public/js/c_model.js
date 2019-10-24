var NEW_ = 0;
var LOAD_ = 1;
function filter_array_key_value(arr, key, value){
    let s_arr = [];
    let i;
    for(i in arr){
        if(arr[i][key] == value){
            s_arr.push(arr[i]);
        }
    }
    return s_arr;
}

class Model {
    constructor(obj, parent){
        this.uri = parent;
        this.obj = obj;
        this.note = [];
        if((typeof obj) == "object"){
            this.status = NEW_;
        } else if (typeof obj == "string"){
            this.status = LOAD_;
            // this.begin();    
        } else {
            console.log("WARNING: using finding with " + parent)
        }
    }

    async begin(){
        if(this.status == LOAD_){
            let a = await fetch(this.uri + "/" + this.obj);
            this.obj = await a.json();
            this.note = await this.get_note();
        } else {
            /* NOTHING TO DO IN HERE */
        }
    }

    async save(){
        // console.log(this.obj);
        if(this.status == NEW_){
            // r_data = await post("/customers", this.obj);
            let response = await fetch(this.uri, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.obj)
            });
            let result = await response.json();
            // console.log(result);
            this.obj = result;
            this.status = LOAD_;
            return (result.message);
        } else {
            console.log(this.uri + "/" + this.obj._id);
            console.log(this.obj)
            let response = await fetch(this.uri + "/" + this.obj._id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.obj)
            });
            let result = await response.json();
            // console.log(result);
            return (result.message);
        }
    }
/* 
        SYSTEM DEFINE SUPPORT FINDING A ARRAY ELEMENT IN SYSTEM MODEL
        YOU CANNOT CHANGE ANOTHING IN HERE
*/
    //  Find with attribute
    async find(obj){
        let r_data;
        let i;
        if((obj == undefined) || (obj == {})){
            let data = await fetch(this.uri);
            r_data = await data.json();
        } else {
            /* Tìm theo đặc tính của hệ thống */
            let data = await fetch(this.uri);
            r_data = await data.json();
            // let filter_array = r_data;
            for(i in obj){
                r_data = filter_array_key_value(r_data, i, obj[i]);               
            }
        }
        return r_data;
    }

    //  Find with createdAt days
    async find_time(start, end){
        let r_data;
        let i;
        let data = await fetch(this.uri);
        r_data = await data.json();
        data = [];
        for(i in r_data){
            let t = (new Date(r_data[i].createdAt)).getTime();
            // console.log("D1:", r_data[i].createdAt);
            // console.log("D2:", (new Date(start)))
            if((t >= start) && (t <= end)){
                data.push(r_data[i]);
            }
        }
        // this.note = data;
        if(data.length == 0){
            console.log("Nhớ lưu ý mỗi ngày có đến 86400 * 1000 giây nhe!. Hệ thống đang tính theo micro_seconds");
        }
        return data;
    }

    async delete(){
        let a = await fetch(this.uri + "/" + this.obj._id,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        delete this.obj;
        return await a.json();
    }

    get(){
        return this.obj;
    }

    set(o){
        this.obj = o;
    }

    getNote(){
        return this.note;
    }

    async get_note(){
        let i;
        if(this.uri == "/notes"){
            return [];
        }
        var n = new Note();
        let note;
        if(this.status == LOAD_){
            try{
                note = await n.find({
                    source: this.uri.split("/")[1],
                    sourceId: this.obj._id
                });
            } catch(e){
                // console.log(e);
            }
            let r = [];
            for (i in note){
                let t_n_ = new Note(note[i]._id);
                await t_n_.begin();
                r.push(t_n_);
            }
            return r;
        } else {
            return [];
        }
    }
    getDateString(){
        return (new Date(this.obj.createdAt)).toLocaleString();
    }
}