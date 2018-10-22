// var list = [
//     {"desc":"mochila","amount":"2","value":"1.56"},
//     {"desc":"lapis","amount":"3","value":"2.56"},
//     {"desc":"caderno","amount":"4","value":"7.56"}
// ];
function getTotal(list){
    var total = 0
    for(var key in list){
        total += list[key].value * list[key].amount
    };
    document.getElementById("totalValue").innerHTML = formatValue(total);
    
};

function setList(list){    
    var table = "<thead><tr><td>Descreption</td>"
    +"<td>Amount</td>"
    +"<td>Value</td>"
    +"<td>Action</td>"
    +"</tr></thead><tbody>";
    for(var key in list){
        table += '<tr><td>'+formatDesc(list[key].desc)
        +'</td><td>'+formatAmount(list[key].amount)
        +'</td><td>'+formatValue(list[key].value)
        +'</td><td><button onclick="deleteData('+key+');' 
        +'"class="btn btn-default"> Delet</button>'
        +' <button onclick="setUpdate('+key+');'
        +'" class="btn btn-default">Edit</button></td></tr>';
        };
    table += "</tbody>";
    document.getElementById("listTable").innerHTML = table;
    saveListStorage(list)
    };

function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
};

function formatAmount(amount){
    return parseFloat(amount);
}

function formatValue(value){
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ",");
    str = "$ " + str;
    return str;
};
function addData(){
    if(!validation()){
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc,"amount":amount, "value":value});
    setList(list);
    resetForm();
};

function setUpdate(id){
    resetForm();
    var obj = list[id]
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block"; // Faz o botão de save aparecer
    document.getElementById("btnAdd").style.display = "none"; // esconde o botão add 
    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
    
    
};
function updateData(){
    if(!validation()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {"desc":desc, "amount":amount, "value":value};
    resetForm();
    setList(list);
};

function saveListStorage(list){
    var jsonStr = JSON.stringify(list); // Passa a lista de json para string
    localStorage.setItem("list", jsonStr); // Salva a lista no storage do navegador
};

function initListStorage(){
    var testeList = localStorage.getItem("list")
    if (testeList){
        list = JSON.parse(testeList);
        setList(list)
    }
}
function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("erro").style.display = "none";
    getTotal(list);
};


function deleteData(id){
    if(confirm("Deseja excluir esse iten?")){
        if(id == list.length -1){
            list.pop();
        } else if (id == 0){
            list.shift();
        } else{
            var concate1 = list.slice(0, id); // pega do primeiro item ate o id
            var concate2 = list.slice(id + 1); // pega do item dps do id ate o ultimo
            list = concate1.concat(concate2);
        };
        setList(list);
        resetForm();
    };
};
function deleteList(){
    if(confirm("Voce deseja deletar todos os itens da lista?"))
    list = [];    
    setList(list);    
}
 
function validation(){
    var desc = document.getElementById("desc").value
    var amount = document.getElementById("amount").value
    var value = document.getElementById("value").value
    var erro = ""

    if (desc == ""){
        erro += "<p>Digite uma descrição</p>"
    }
    if (amount == ""){
        erro += "<p>Digite uma quantidade</p>"
    }else if (amount != parseInt(amount)){
        erro += "<p>Digite um valor Valido</p>"
    }
    if (value == ""){
        erro += "<p>Digite uma quantidade valida</p>"
    }else if(value != parseFloat(value)){
        erro += "<p>Digite um valor valido</p>"
    }

    if (erro != ""){
        document.getElementById("erro").innerHTML = "<h3>Erro: </h3>" + erro
        document.getElementById("erro").style.display = "block"
        return 0;
    }else{
        return 1;
    }
}
initListStorage()
console.log(getTotal(list)); 