import fs from "fs";


export default function updateDB(pathArquivo, attrParaComparar, attrParaCompararDoDado, objetoNovo){
    try{
        let arrData = fs.readFileSync(pathArquivo, "ascii");

        arrData = JSON.parse(arrData);
        
        let newData = [];

        if(arrData.length > 0){
            newData = arrData.map(item => (item[attrParaComparar].toString() === attrParaCompararDoDado) ?
                                            objetoNovo.get() : item);

            const addedNewPerson = newData.filter(item => item[attrParaComparar].toString() === attrParaCompararDoDado);

            if(addedNewPerson.length === 0){
                newData.push(objetoNovo.get());
            }
        }else{
            newData.push(objetoNovo.get())
        }

        fs.writeFileSync(pathArquivo, JSON.stringify(newData));

        return "ok"

    }catch(err){
        throw err;
    }
}