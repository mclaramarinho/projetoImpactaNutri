import fs from "fs";


export default function updateDB(pathArquivo, attrParaComparar, attrParaCompararDoDado, objetoNovo){

    try{
        let arrData = fs.readFileSync(pathArquivo, "ascii");

        arrData = JSON.parse(arrData);

        if(arrData.length > 0){
            arrData = arrData.map(item => {
                if(item[attrParaComparar] === attrParaCompararDoDado){
                    return objetoNovo.get();
                }else{
                    return item;
                }
            })
        }else{
            arrData.push(objetoNovo.get())
        }

        fs.writeFileSync(pathArquivo, JSON.stringify(arrData));

        return "ok"

    }catch(err){
        throw err;
    }
}