export default class Product {
    constructor(code, nombre, amount, cost)
    {
       this.code  = code;
       this.nombre = nombre;
       this.amount = amount;
       this.cost = cost;
       this.siguiente = null;
       this.anterior = null;
    }

    getId()
    {
        return Number(this.code);
    }

    getNombre()
    {
        return this.nombre;
    }

    getCantidad()
    {
        return this.amount;
    }

    getCosto()
    {
        return this.cost;
    }

    getCostoTotal()
    {
        return this.amount * this.cost;
    }

    setId(code)
    {
        this.code = code;
        return this.code;
    }

    setNombre(nombre)
    {
        this.nombre = nombre;
        return this.nombre;
    }

    setCantidad(amount)
    {
        this.amount = amount;
        return this.amount;
    }

    setCosto(cost)
    {
        this.cost = cost;
        return this.cost;
    }

    datosHtml()
    {
        return `<div>
                    <p>code: ${this.getId()}</p>
                    <p>Nombre: ${this.getNombre()}</p>
                    <p>Cantidad: ${this.getCantidad()}</p>
                    <p>Costo Individual: $${this.getCosto()}</p>
                    <p>Costo Total: $${this.getCostoTotal()}</p>
                </div>`;
    }
}