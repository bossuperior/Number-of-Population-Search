const result = document.getElementById("result")
const filter = document.getElementById("input") //สร้างตัวแปร filter สำหรับชี้ไปที่ input id  
const listItem = [] //สร้าง array เปล่าๆใช้เก็บ item ที่ไปดึงข้อมูลมาจาก api เพื่อใช้ Include function ของ Array ในการค้นหาข้อมูล

filter.addEventListener("input", (e)=>{
    const search = e.target.value.toLowerCase() //พิมพ์ชื่อประเทศเก็บในตัวแปร search
    listItem.forEach(item=>{
        if(item.innerText.toLowerCase().includes(search)){ //เทียบว่าสิ่งที่ user พิมพ์กับ item ใน listitem ตรงกันหรือไม่   
            //แสดงรายการ
            item.classList.remove("hide")
        }else{
            //ซ่อนรายการไม่เกี่ยวข้อง
            item.classList.add("hide")
        }
    })
})

async function getData(){ //ระบุ async เพื่อให้ดึงข้อมูลมาหมดก่อนค่อยแสดงผล
    const url = "https://restcountries.com/v2/all"
    const res = await fetch(url)
    const items = await res.json()
    result.innerHTML = "" //กำหนดให้ result ใน array เป็นค่าว่างก่อน
    items.forEach(data=>{ //ดึงข้อมูลจาก Items มาแสดงผลในรูปแบบ List
        const li = document.createElement("li")
        listItem.push(li) //li จัดเก็บเข้าไปใน listItem สำหรับ filter data ต่อไป
        li.innerHTML = ` <!--พท.แสดงผลข้อมูล-->
            <img src = "${data.flag}"/> 
            <div class = "info">
                <h4>${data.name}</h4>
                <p>${formatNumber(data.population)}</p>
            </div>
            `
        result.appendChild(li) //li มายัดต่อกันเรื่อยๆใน result
    })
}
function formatNumber(num) { //สร้าง function สำหรับจัดการแสดงผลตัวเลขจำนวนประชากรโดยมี , คั่นทุก 3 หลัก
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
getData()