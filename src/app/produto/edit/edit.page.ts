import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

import { Produto } from '../produto';
import { ProdutoService } from "../produto.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  produto: Produto;
  id: number = 0;

  constructor(
    public alertController: AlertController,
    private produtoService: ProdutoService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.produto = new Produto();
    if (this.activeRouter.snapshot.paramMap.get("id") == null) {
      this.presentAlert("Erro", "Você não selecionou um cliente!", "");
    } else {
      this.id = parseInt(this.activeRouter.snapshot.paramMap.get("id"));
      this.produtoService
        .getProduto(this.id)
        .subscribe(dados => (this.produto = dados));
    }
  }

  formDados(form) {
    if (form.valid) {
      this.updateProduto(this.produto, this.id) ? form.reset() : "";
    }
  }

  updateProduto(produto: Produto, id: number): boolean {
    this.produtoService.updateProduto(produto, id).subscribe(
      ok => {
        this.presentAlert("AVISO", "Atualizado", "success");
        this.produto = new Produto();
        this.id = 0;
        this.router.navigate(['tabs/tab3'])
      },
      erro => {
        this.presentAlert("ERRO!", "Não foi possível atualizar!", "danger");
        return false;
      }
    );
    return true;
  }

  async presentAlert(tipo: string, texto: string, cor: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: "Subtitle",
      message: texto,
      cssClass: cor,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
