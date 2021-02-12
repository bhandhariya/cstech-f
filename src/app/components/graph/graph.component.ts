import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['monday', 'tuesday', 'wednesday', 'thrusday', 'friday', 'saturday', 'sunday'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

   barChartData: any = [
    
  ];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.timewise()
  }
  timewise(){
    this.http.get('http://localhost:3000/users/time').subscribe((r:any)=>{
      console.log(r);
      var result:any=[]
      r.map((ele:any)=>{
          result.push(ele.count)
      })
      console.log(result)
      this.barChartLabels = r.map((ele:any)=>{ return ele._id.day;})
      this.barChartData[0]['data']=result;
      console.log('result',this.barChartData);
      
    })


  }
}
