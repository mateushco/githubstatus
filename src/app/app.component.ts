import { Component, OnInit, SkipSelf } from '@angular/core';
import axios from 'axios';
import cheerio from 'cheerio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'githubstatus';
  titulo = [];
  status = [];
  objetos = [];
  color;

  ngOnInit() {
    this.consume();
  }

  refresh() {
    this.objetos = [];
    this.consume();
  }

  consume() {
    const url = 'https://www.githubstatus.com';
    const AxiosInstance = axios.create();
    AxiosInstance.get(url)
      .then(
        response => {
          const html = response.data;
          const $ = cheerio.load(html);
          this.objetos = [];
          
          for (let i = 1; i <= 9; i++) {
            if (i === 4) {
            }
            else {
              this.titulo[i] = $('body > div.layout-content.status.status-index.starter > div.container > div.components-section.font-regular > div > div:nth-child(' + [i] + ') > div > span.name').text().trim();
              this.status[i] = $('body > div.layout-content.status.status-index.starter > div.container > div.components-section.font-regular > div > div:nth-child(' + [i] + ') > div > span.component-status').text().trim();
              var obj: any =
              { 
              "titulo": this.titulo[i], 
              "status": this.status[i] 
              }
              this.objetos.push(obj);
              
              if(this.status[i] === "Operational"){
                this.color = 1;
              } else {
                this.color = 2;
              }
              console.log(this.color);
            }
          }
          console.log(this.objetos);
        }
      )
      .catch(console.error);
  }
}