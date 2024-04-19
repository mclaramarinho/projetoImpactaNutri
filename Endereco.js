export default class Endereco{
    #logradouro;
    #cep;
    #cidade;
    #bairro;
    #uf;
    #numero;
    #complemento;

    constructor(cep, logradouro, bairro, cidade, uf, numero, complemento){
        try{
            if(cep.length !== 8){
                throw "CEP invalido!";
            }
            this.#cep = cep;
            this.#logradouro = logradouro;
            this.#bairro = bairro;
            this.#cidade = cidade;
            this.#uf = uf;
            this.#numero = numero;
            this.#complemento = complemento;

            // return Promise.resolve(() => {

            //     this.#requestCEPData(cep)
            //     .then(r => {
            //         console.log(r);
            //         this.#cep = cep;
            //         this.#logradouro = r.logradouro;
            //         this.#bairro = r.bairro;
            //         this.#cidade = r.localidade;
            //         this.#uf = r.uf;
            //         this.#numero = numero;
            //         this.#complemento = complemento;
            //     })
            //     .catch(e => {throw e});
            // })
        }catch(err){
            throw err;
        }
    };

    // async #requestCEPData(cep){
    //     return new Promise(async (res, rej) => {
    //         const req = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    //             method: "GET"
    //         });

    //         if(req.status === 200){
    //             const body = await req.json();
    //             res(body);
    //         }else{
    //             rej(null)
    //         }
    //     })
    // };

    get(){
        return {
            logradouro: this.#logradouro,
            cep: this.#cep,
            numero: this.#numero,
            complemento: this.#complemento,
            bairro: this.#bairro,
            cidade: this.#cidade,
            uf: this.#uf
        }
    }
}