export default class CartaoPagamento{
    #apelidoCartao;
    #numeroCartao;
    #tipoCartao;
    #cpfTitular;
    #bandeira;
    #validade;
    #isActive;

    constructor(apelido="", numero, tipo, validade, cpfTitular){
        if(apelido.length === 0){
            const random = Math.floor(Math.random * 100000);
            this.#apelidoCartao = `cartao_${tipo}_${random}${cpfTitular.substring(0,4)}`;
        }
        try{
            if(numero.length < 15 || numero.length > 16){
                throw "2 O número do cartão não é válido.";
            }

            if(validade.length > 7){
                throw "Data de validade invalida.";
            }

            if(cpfTitular.length > 11){
                throw "CPF invalido.";
            }

            if(tipo !== "debito" && tipo !== "credito"){
                throw "Tipo invalido. Aceitamos apenas \'débito\' ou \'crédito\'!"
            }

            this.#isActive = false;
            this.#numeroCartao = numero;
            this.#validade = validade;
            this.#cpfTitular = cpfTitular;
            this.#apelidoCartao = apelido;
            this.#tipoCartao = tipo;

            const primeiroDigito = numero.substring(0, 1);

            switch(primeiroDigito){
                case "2":
                case "5":
                    this.#bandeira = "Mastercard";
                    break;
                case "3":
                    if(numero.length === 15){
                        this.#bandeira = "American Express";
                    }else{
                        this.#bandeira = "Diners";
                    }
                    break;
                case "4":
                    this.#bandeira = "Visa";
                    break;
                case "6":
                    this.#bandeira = "Discover";
                    break;
                default:
                    throw "1 O número do cartão não é válido."
            }

            this.#isActive = this.verificarSeCartaoAtivo();
            if(this.#isActive){
                return "Meio de pagamento criado!"
            }else{
                throw "O cartão não consta como ativo no banco.";
            }
        }catch(err){
            throw err;
        }
    };
    get(){
        return {
            apelidoCartao: this.#apelidoCartao,
            numeroCartao: this.#numeroCartao,
            tipoCartao: this.#tipoCartao,
            cpfTitular: this.#cpfTitular,
            bandeira: this.#bandeira,
            validade: this.#validade,
            isActive: this.#isActive
        }
    };
    verificarSeCartaoAtivo(){
        try{
            // MM/AAAA
            const mes = parseInt(this.#validade.substring(0, 2));
            const ano = parseInt(this.#validade.substring(3, 7));

            const today = new Date();
            const todayAno = today.getFullYear();
            
            if(ano > todayAno){
                return false;
            }else{
                if(ano === todayAno && mes > (today.getMonth()+1)){
                    return false;
                }
            }
            return true;
        }catch(err){
            throw err
        }
    }
}