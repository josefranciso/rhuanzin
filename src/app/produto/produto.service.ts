import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Produto } from "./produto";
import { URL_API } from "../app.api";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProdutoService {
  produtos: Produto[];

  private urlProduto: string = URL_API + "produtos";

  constructor(private http: HttpClient) {
    this.produtos = [];
  }

  addProduto (produto: Produto) {
    return this.http.post<Produto>(this.urlProduto, produto);
  }

  getProdutos(): Observable<Produto[]> {
    //return this.clientes;
    return this.http.get<Produto[]>(this.urlProduto);
  }

  getProduto(id: number) {
    return this.http.get<Produto>(this.urlProduto + "/" + id);
  }

  updateProduto(produto: Produto, id: number){
    return this.http.put<Produto>(this.urlProduto + "/" + id, produto);
  }

  deleteProduto(produto: Produto) {
    //let p = this.clientes.indexOf(cliente);
    //this.clientes.splice(p, 1);
    return this.http.delete<Produto>(this.urlProduto + "/" + produto.id);
  }

  validar(produto: Produto) {
    let erros: string = "";

    if (produto.nome == null) {
      erros += "Nome em branco. <br>";
    }
    if (produto.descricao == null) {
      erros += "Descrição em branco. <br>";
    }
    if (produto.quant == null) {
      erros += "Quantidade em branco. <br>";
    }
    if (produto.valor == null) {
      erros += "Valor em branco. <br>";
    }
    if (erros != "") throw erros;

    return true;
  }
}
