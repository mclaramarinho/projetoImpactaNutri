import fs from "fs";

export function verificarSeClienteExiste(cpf){
    try{
        let clientes = fs.readFileSync("../data/clientes.json", "ascii");
        clientes = JSON.parse(clientes);

        if(clientes.length === 0){
            return false;
        }

        const clienteExiste = clientes.filter(item => item.cpf === cpf);
        if(clienteExiste.length === 0){
            return false;
        }else{
            return true;
        }
    }catch(err){
        throw err;
    }
}

export function verificarSeNutriExiste(idNutri){
    try{
        let nutris = fs.readFileSync("../data/nutricionistas.json", "ascii");

        nutris = JSON.parse(nutris);

        if(nutris.length === 0){
            return false;
        }

        const nutriExiste = nutris.filter(item => item.idNutri === idNutri);

        if(nutriExiste.length === 0){
            return false;
        }else{
            return true;
        }
    }catch(err){
        throw err;
    }
}