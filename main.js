import Inventario from "./inventario.js";
import Product from "./product.js";

class App
{
    constructor()
    {
        this.inventario = new Inventario();
        this.btnRegistrar = document.getElementById('btnRegistrar');
        this.btnBorrar = document.getElementById('btnBorrar');
        this.btnBuscar = document.getElementById('btnBuscar');
        this.btnListar = document.getElementById('btnListar');
        this.btnListarInvertido = document.getElementById('btnListarInvertido');
        this.btnPosition = document.getElementById('btnPosition')

        this.actions = document.getElementById('actions')

        this.btnRegistrar.addEventListener('click', this.agregarP);
        this.btnBorrar.addEventListener('click', this.borrarP);
        this.btnListar.addEventListener('click', this.listarP);
        this.btnListarInvertido.addEventListener('click', this.listarInvertidoP);
        this.btnBuscar.addEventListener('click', this.buscarP);
    }

    agregarP = () => {
        let product = this._createProduct();

        if(!product)
        {
            this.actions.innerHTML = "";
            return this.actions.innerHTML += 'Llene todos los campos para registrar un producto';
        }

        let added = this.inventario.agregar(product);

        if(!added)
        {
            this.actions.innerHTML = "";
            return this.actions.innerHTML = "El producto ya fue registrado con anterioridad";
        }

        this.actions.innerHTML = "";
        console.log(this.inventario);
        return this.actions.innerHTML = `Producto ${product.getId()} fue registrado correctamente`;
    }

    borrarP = () => {
        let inpId = document.getElementById('insertCode');
        let code = inpId.value;

        let borrarP = this.inventario.borrar(code);


        if(!code)
        {
            this.actions.innerHTML = "";
            return this.actions.innerHTML += 'Favor de ingresar un código de procucto para borrar';
        } 
        else if(!borrarP)
        {
            inpId.value = "";
            this.actions.innerHTML = "";
            return this.actions.innerHTML += 'Null';
        }
        else 
        {
            inpId.value = "";
            borrarP;
            this.actions.innerHTML = "";

            return this.actions.innerHTML += `El producto ${code} ha sido borrado correctamente.`;
        }
    }

    listarP = () => {
        let prov = this.inventario.principio;
        let table = document.getElementById('table');
        this._borrarTabla();
        this.actions.innerHTML = "";

        if(!this.inventario.principio)
        {
            this.actions.innerHTML = "";
            return this.actions.innerHTML += `No se ha registrado ningun producto`;
        } 
        else 
        {
            while(prov != null)
            {

                let row = table.insertRow(-1);
                let colCode = row.insertCell(0);
                let colName = row.insertCell(1);
                let colAmount = row.insertCell(2);
                let colCost = row.insertCell(3);
                let colTotalCost = row.insertCell(4);

                row.setAttribute('code', `row${prov.code}`);
                colCode.setAttribute('code', `colCode${prov.code}`);
                colName.setAttribute('code', `colName${prov.code}`);
                colAmount.setAttribute('code', `colAmount${prov.code}`);
                colCost.setAttribute('code', `colCost${prov.code}`);
                colTotalCost.setAttribute('code', `colTotalCost${prov.code}`);

                colCode.innerHTML = prov.code;
                colName.innerHTML = prov.nombre;
                colAmount.innerHTML = prov.amount;
                colCost.innerHTML = "$" + prov.cost;
                colTotalCost.innerHTML =  `$${prov.getCostoTotal()}`;

                prov = prov.siguiente;
            }
            this.actions.innerHTML += `Tabla normal`;
        }
    }

    listarInvertidoP = () => {
        let prov = this.inventario.principio;
        let table = document.getElementById('table');
        this._borrarTabla();
        this.actions.innerHTML = "";

        if(!this.inventario.principio)
        {
            this.actions.innerHTML = "";
            return this.actions.innerHTML += `No se ha registrado ningun producto`;
        } 
        else 
        {
            while(prov != null)
            {

                let row = table.insertRow(1);
                let colCode = row.insertCell(0);
                let colName = row.insertCell(1);
                let colAmount = row.insertCell(2);
                let colCost = row.insertCell(3);
                let colTotalCost = row.insertCell(4);

                row.setAttribute('code', `row${prov.code}`);
                colCode.setAttribute('code', `colCode${prov.code}`);
                colName.setAttribute('code', `colName${prov.code}`);
                colAmount.setAttribute('code', `colAmount${prov.code}`);
                colCost.setAttribute('code', `colCost${prov.code}`);
                colTotalCost.setAttribute('code', `colTotalCost${prov.code}`);

                colCode.innerHTML = prov.code;
                colName.innerHTML = prov.nombre;
                colAmount.innerHTML = prov.amount;
                colCost.innerHTML = "$" + prov.cost;
                colTotalCost.innerHTML =  `$${prov.getCostoTotal()}`;

                prov = prov.siguiente;
            }
            this.actions.innerHTML += `Tabla invertida`; 
        }
    }
    buscarP = () => {
        let inpId = document.getElementById('insertCodeSearch');
        let code = inpId.value;
        let buscarP = this.inventario.buscar(code);

        if(!code)
        {
            this.actions.innerHTML = "";
            return this.actions.innerHTML += 'Favor de ingresar un código de producto';
        } 
        else if(!buscarP)
        {
            inpId.value = "";
            this.actions.innerHTML = "";
            return this.actions.innerHTML += `No hay ningun producto con el código ingresado`;
        } 
        else 
        {
            inpId.value = "";
            this.actions.innerHTML = "";
            this.actions.innerHTML += buscarP.datosHtml();
        }
    }

    //Private
    _createProduct() 
    {
        let inpId = document.querySelector('#txtId');
        let inpNombre = document.querySelector('#txtNombre');
        let inpCantidad = document.querySelector('#txtCantidad');
        let inpCosto = document.querySelector('#txtCosto');

        let code = inpId.value;
        let nombre = inpNombre.value;
        let amount = inpCantidad.value;
        let cost = inpCosto.value;

        if(code && nombre && amount && cost)
        {
            inpId.value = '';
            inpNombre.value = '';
            inpCantidad.value = '';
            inpCosto.value = '';

            return new Product(code, nombre, amount, cost);
        }

        return null;
    }

    _borrarTabla()
    {
        let table = document.getElementById('table');
        table.innerHTML = '<tr><th>Id</th><th>Producto</th><th>cantidad</th><th>costo</th><th>costo Total</th></tr>'
    }

}

new App();