export function validarCPF(cpf){
    try{
        if(cpf.length !== 11){
            throw "O tamanho do CPF é inválido! Ele deve conter apenas 11 números."
        }

        return "ok";
    }catch(err){
        throw err;
    }
}

export function isCampoVazio(valor, nomeDoCampo=""){
    try{
        if(valor && valor.length > 0){
            return 'ok';
        }else{
            if(nomeDoCampo.length === 0){
                throw "Campo vazio."
            }else{
                throw `O campo ${nomeDoCampo} nao pode estar vazio.`
            }
        }
    }catch(err){
        throw err;
    }
}

export function validarTamanho(valor, maxChars, nomeDoCampo=""){
    try{
        if(valor && valor.length <= maxChars){
            return "ok";
        }
        else{
            throw `O campo ${nomeDoCampo} contem mais caracteres do que deveria.`;
        }
    }catch(err){
        throw err;
    }
}

export function validarDiasDaSemana(dia){
    const diasPermitidos = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];

    try{
        if(diasPermitidos.includes(dia)){
            return "ok";
        }else{
            throw "O dia informado eh invalido."
        }
    }catch(err){
        throw err;
    }
}

export function validarTelefone(telefone){
    try{
        const regex = /^\d+$/;

        if(regex.test(telefone)){
            return "ok";
        }else{
            throw "O valor indicado nao eh um numero de telefone valido."
        }
    }catch(err){
        throw err;
    }
}

export function validarEmail(email){
    try{
        const regex = /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/;

        if(regex.test(email)){
            return "ok";
        }else{
            throw "O email informado nao eh valido."
        }
    }catch(err){
        throw err;
    }
}

