function GetRequest() {
    var url = decodeURI(location.search); //获取url中"?"符后的字串
    var theRequest = {}
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for ( var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

let res = []
let page = 1
async function select(url, total, tablebody, pageSize, pageUl, type='') {
    tablebody.innerHTML = ''
    axios.get(url)
		.then((data) => {
            res = data.data.data
            console.log(data.data)
			total.innerText = data.data.total ? data.data.total : res ? res.length : 0
			for (let i = 0; i < res.length; i++) {
				let trList = `<tr class="text-c">
					<td><input type="checkbox" onChange="check(this, ${i})"></td>
					<td>${i+1}</td>
					<td><img src="http://localhost:3000${res[i].image}" style="width: 100px;height: 100px;"></td>
                    <td>${res[i].name}</td>
                    <td>${res[i].price}</td>
					<td>${res[i].typeName}</td>
					<td>${res[i].desc}</td>
					<td class="f-14 product-brand-manage">
						<a style="text-decoration:none" onClick=edit(${i}) href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>
						<a style="text-decoration:none" class="ml-5" onClick="del(${i})" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>
					</td>
				</tr>`
				tablebody.innerHTML += trList
            }
            if (type !== 'footer') {
                pageUl.innerHTML = ''
                console.log(data.data)
                page = Math.ceil(+total.innerText / +pageSize)
                for (let i = 1; i <= page; i++) {
                    pageUl.innerHTML += `<li class="pageLi" onClick=getPageInfo(${i})>${i}</li>`
                }
            }
        })
}

function edit(id) {
    console.log(res[id]['_id'])
    window.location.href = `./food-add.html?id=${res[id]['_id']}`
} 

function del(id) {
    if (id !== undefined) {
        confirm('确定删除吗？') ? axios.post('http://localhost:3000/food/delete', { id: res[id]['_id'] }).then(() => {location.replace(location.href)}) : ''
    } else {
        confirm('确定删除吗？') ? axios.post('http://localhost:3000/food/delete', { id: checkArr }).then(() => {location.replace(location.href)}) : ''
    }
}

function check(obj, id) {
    obj.checked ? checkArr.push(res[id]['_id']) : checkArr.splice(checkArr.indexOf(res[id]['_id']), 1)
}

function getPageInfo(index) {
    currentPage = index
    for (let i = 0; i < domLi.length; i++) {
        domLi[i].style.backgroundColor = 'transparent'
        if (+domLi[i].innerText === index) {
            domLi[i].style.backgroundColor = 'blue'
            select(`http://localhost:3000/food/select?pageSize=${pageSize}&page=${currentPage}`, total, tablebody, pageSize, pageUl, 'footer')
        }	
    }
 }

function pageSelect(str) {
    console.log(currentPage)
    if (str === 'up') {
        if (currentPage > 1) {
            currentPage --
            getPageInfo(currentPage)
        } else {
            return false
        }
    } else {
        if (currentPage < page) {
            currentPage ++
            getPageInfo(currentPage)
        } else {
            return false
        }
    }
}
