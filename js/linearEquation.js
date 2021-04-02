const params = {
    c: 0,
    m: 1,
    xPower: 2,
    xAxisMin: -1,
    xAxisMax: 1.5,
    yAxisMin: -.2,
    yAxisMax: 1.5,
}


const funcOfX = (params, graphDims, interval = 200) => {    
    const xRange = (start, stop, step) => {
        const xRangeArr = Array.from({length: ( stop - start ) / step}, (_, i) => start + (i * step) );
        console.log(xRangeArr);
        return xRangeArr;
    };

    const xRangeArr = (xRange(params.xAxisMin, params.xAxisMax, (params.xAxisMax - params.xAxisMin) / interval) );
    const yUnit = graphDims.y1 / (params.yAxisMax - params.yAxisMin);
    const xUnit = graphDims.x1 / (params.xAxisMax - params.xAxisMin);

    const linearPlot = xRangeArr.reduce(( acc, ele, idx, arr ) => {
        const yVal =  ( ( params.m * Math.pow(( ele ),params.xPower) ) + params.c);
        console.log(yVal);
        return (graphDims.y1 - (yVal * yUnit)) >= graphDims.y0 * 1.05 && (ele * xUnit + graphDims.x0) <= graphDims.x1 * 0.95 ? (acc + ` L ${ele * xUnit + graphDims.x0} ${graphDims.y1 - (yVal * yUnit)}`) : acc }, `M ${xRangeArr[0] * xUnit + graphDims.x0} ${graphDims.y1 - params.c}`         
    );        
    
    console.log(linearPlot.toString());
    return linearPlot;
};

const visPanel = document.querySelector('#visualise-panel');

const svgGen = (id, width, height) => {
    const svgEle = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svgEle.setAttribute('id', id);
    svgEle.setAttribute('width', width);
    svgEle.setAttribute('height', height);
    svgEle.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return svgEle;
}

const graphArea = (graphDims) => {
    const plotWidth = graphDims.x1 - graphDims.x0;
    const plotHeight = graphDims.y1 - graphDims.y0;    
    const gPlot = document.createElementNS('http://www.w3.org/2000/svg','g');
    gPlot.setAttribute('id', 'graph-1');
    gPlot.setAttribute('left', `${graphDims.x0}`);
    gPlot.setAttribute('top', `${graphDims.y0}`);

    const axis = document.createElementNS('http://www.w3.org/2000/svg','path');
    axis.setAttribute('d' , `M ${graphDims.x0} ${graphDims.y0} L ${graphDims.x0} ${graphDims.y1} L ${graphDims.x1}, ${graphDims.y1}`);
    axis.setAttribute('fill', 'transparent');
    axis.setAttribute('stroke', 'black')
    gPlot.append(axis);
    
    const plotLine = document.createElementNS('http://www.w3.org/2000/svg','path');
    plotLine.setAttribute('d', funcOfX(params, graphDims));
    plotLine.setAttribute('fill', 'transparent');
    plotLine.setAttribute('stroke', 'darkred');
    gPlot.append(plotLine);

    return gPlot;
}
const newSVG = svgGen('newPlot', visPanel.offsetWidth, visPanel.offsetHeight);

const graphDims = {
    x0: 50,
    x1: 250,
    y0: 100,
    y1: 300
}

const graph = graphArea(graphDims);

newSVG.append(graph);
visPanel.append(newSVG);

