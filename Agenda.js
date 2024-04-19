export default class Agenda{
    #idAgenda;
    #idNutri;
    #disponibilidade;
    
    constructor(idNutri){
        try{
            // TODO - Random long id generator
            this.#idAgenda = "";

            this.#idNutri = idNutri;
            this.#disponibilidade = {
                seg:[],
                ter:[],
                qua:[],
                qui:[],
                sex:[],
                sab:[],
                dom:[],
            };
        }catch(e){
            throw e;
        }
    };

    adicionarDisponibilidade(dia, horarios){
        try{
            // TODO - Validar dia 
            // TODO - Validar formato dos horarios (deve conter: inicio, fim, especialidade, isDisponivel, tipo[O ou P], valor)

            if(dia.length === 24){
                // TODO - Chamar update horarios
            }

            if(horarios.length > 24){
                throw "A quantidade de horarios diarios nao pode exceder 24.";
            }

            // Verificar cada horario passado e se ele ja existe nos horarios desse dia
                // Se existir, deve ser feito um update.
                // Se não existir (undefined), antes de passar para o proximo indice, adicionar o horario ao array
            
            horarios.map(h => {
                const horarioJaExiste = this.#disponibilidade[dia].filter(item => item.inicio === h.inicio && item.fim === h.fim);
               
                if(horarioJaExiste.length === 0){
                    this.#disponibilidade[dia].push(h);
                }else{
                    const index = this.#disponibilidade[dia].findIndex(x => x === horarioJaExiste);
                    this.#disponibilidade[dia][index] = h;
                }

            })
        }catch(e){
            throw e;
        }
    };
    
    get(){
        return{
            idAgenda: this.#idAgenda,
            idNutri: this.#idNutri,
            disponibilidade: this.#disponibilidade
        }
    }
}