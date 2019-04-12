import { Component, OnInit } from '@angular/core';
import { ProdutoService } from "../produto.service";
import { Produto } from "../produto";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  produtos$: Observable<Produto[]>;

  constructor(
    private produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    this.produtos$ = this.produtoService.getProdutos();
  }

  remover(produto: Produto) {
    this.produtoService.deleteProduto(produto).subscribe(
      ok => {
        console.log("Apagado");
        this.produtos$ = this.produtoService.getProdutos();
      },
      erro => {
        console.log(erro);
      }
    );
  }

  atualizar(produto: Produto) {
    //this.clienteService.getCliente();
    this.router.navigate(["tabs/tab2", produto.id]);
  }

  doRefresh(event) {
    //console.log('Begin async operation');
    this.produtos$ = this.produtoService.getProdutos();

    setTimeout(() => {
      //sconsole.log('Async operation has ended');
      event.target.complete();
    }, 3000);
  }
}
