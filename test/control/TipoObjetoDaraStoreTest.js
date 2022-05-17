import TipoObejtoDataStore from "../../js/control/TipoObjetoDataStore.js"
describe('TipoObjetoDataStore', function(){
    var cut;
    it("deberia instanciarce",function(){
        cut=new TipoObejtoDataStore();
        assert.isDefined(cut,"el objeto no esta instanciado");
    });

    it('deberia buscar primeros 50',function(){
        cut.findRange(0,50).then(function(respuesta){
            assert.equal(respuesta.status,200);
        });

    });
});