

class Metrics {

    private metrics: {
        totalRequests:number,
        totalErrors:number,
        requestBreakdown:{}
    }

    constructor() {
        this.metrics = {
            totalRequests:0,
            totalErrors:0,
            requestBreakdown:{
            }
        }
    }


    requestCount(path:string,count:number){
        this.metrics.totalRequests += count;
    }

    getMetrics(){
        return this.metrics
    }



    errorCount(){

    }


}



export const metrics = new Metrics()
