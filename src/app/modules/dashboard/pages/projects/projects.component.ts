import { AfterViewInit, Component, OnInit } from '@angular/core';
import { html, UserConfig } from 'gridjs';

@Component({
  selector: 'admin-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit,AfterViewInit {
  projectsData!:any[];
  
  public projectsGridConfig!: UserConfig;

  constructor() { }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.projectsGridConfig = {
        columns: [
          {
            id: "id",
            name: "UID",
            hidden:true
          },
          {
            id: "sno",
            name: "ID",
            formatter: (cell) => html(`<span class="mx-2">${cell}</span>`),
          },
          {
            id: "name",
            name: "Project Name",
            formatter: (cell) =>
              html(
                `<span class="text-slate-700 dark:text-navy-100 font-medium">${cell}</span>`
              ),
          }, {
            id: "users",
            name: "No. of Users",
          }
        ],
        data :this.projectsData,
        sort: true,
        search: true,
        fixedHeader: true,
        height: '250px',
        pagination: {
          enabled: true,
          limit: 10,
        },
        language:{
          'search':{
            'placeholder':'Search Projects By Name....'
          }
        },
        className: {
          header: 'projects-table-header'
        }
      }; 
    });
    setTimeout(() => {
      let projects_grid_js_head = document.getElementsByClassName('projects-table-header');
      let addProjectsButtonContainer = document.getElementById('addPojectsButtonConatiner');
      if(projects_grid_js_head.length>0 && addProjectsButtonContainer){
        projects_grid_js_head[0].appendChild(addProjectsButtonContainer);
      }
    });
  }

  ngOnInit(): void {
    this.projectsData = [];
  }

  createNewProject(){

  }
}
