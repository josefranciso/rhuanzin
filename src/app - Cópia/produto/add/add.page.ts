import { Component, OnInit } from "@angular/core";
import { ProdutoService } from "../produto.service";
import { Produto } from "../produto";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AlertController } from "@ionic/angular";
import { TabsPage } from "../../tabs/tabs.page";

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"]
})
export class AddPage implements OnInit {
  produto: Produto;
  confPws: string;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    public alertController: AlertController,
    private tabs: TabsPage
  ) { }

  ngOnInit() {
    this.produto = new Produto();
  }

  formDados(form) {
    if (form.valid) {
      this.addProduto(this.produto) ? form.reset() : "";
    }
  }

  addProduto(produto: Produto): boolean {
    this.produtoService.addProduto(produto).subscribe(
      ok => {
        this.presentAlert("AVISO", "Cadastrado", "success");
        this.produto = new Produto();
        this.confPws = "";
        this.router.navigate(["tabs/tab3"]);
      },
      erro => {
        this.presentAlert("ERRO!", "", "danger");
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
  }
}
