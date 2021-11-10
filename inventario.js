export default class Inventario
{
    constructor()
    {
        this.principio = null;
        this.length = 0;
    }

    agregar(nuevo)
    {
        if(this.length < 20)
        {
            if(this.principio == null)
            {
                this.principio = nuevo;
                this.length++;
                return this.principio;
            }

            else if(this.buscar(nuevo.getId()))
            {
                return null;
            } 

            else 
            {
                this._agregar(nuevo, this.principio);
                this.length++
                return this.principio;
            }
        }
    }

    _agregar(nuevo, ultimo) 
    {
        if(nuevo.code < ultimo.code)
        {
            let aux = ultimo;
            let anterior = ultimo.anterior;

            if(ultimo.anterior != null)
            {
                ultimo.anterior.siguiente = nuevo;
            }

            ultimo = nuevo;
            ultimo.siguiente = aux;
            ultimo.anterior = anterior;
            ultimo.siguiente.anterior = ultimo;

            if(ultimo.code < this.principio.code)
            {
                this.principio = ultimo;
            }
        } 
        else if(ultimo.siguiente == null)
        {
            ultimo.siguiente = nuevo;
            nuevo.anterior = ultimo
        } 
        else 
        {
            this._agregar(nuevo, ultimo.siguiente);
        }
    }
    
    buscar(codigo)
    {
        if(!this.principio)
        {
            return null;
        }
        
        let aux = this.principio;

        while(aux != null)
        {
            if(aux.getId() == codigo)
            {
                return aux;
            }
            aux = aux.siguiente;
        }

        return null;
    }

    borrar(codigo)
    {
        let borrado = null;

        if(!this.principio)
        {
            return null;
        }

        if(this.principio.code == codigo)
        {
            borrado = this.principio;
            this.principio = this.principio.siguiente;
            this.principio.anterior = null;
            this.length --;
            return borrado;
        } 
        else 
        {
            let anterior = this.principio;
            let reciente = this.principio.siguiente;
            let sig = reciente.siguiente;

            while(reciente != null)
            {
                if(reciente.code == codigo)
                {
                    borrado = reciente;
                    anterior.siguiente = reciente.siguiente;
                    sig.anterior = anterior;
                    borrado.siguiente = null;
                    this.length --;
                    return borrado;
                } 
                else 
                {
                    anterior = reciente;
                    reciente = reciente.siguiente;
                    if(sig.siguiente != null)
                    {
                        sig = sig.siguiente;
                    }
                }
            }
        }
        return borrado;
    }
}