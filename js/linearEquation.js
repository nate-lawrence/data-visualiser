const params = {
    c: 0,
    m: 1,
}


const funcOfX = (c, m, graphDims, interval = 50) => {    
    const xRange = (start, stop, step) => {
        const xRangeArr = Array.from({length: ( stop - start ) / step}, (_, i) => start + (i * step) );
        return xRangeArr;
    };

    const xRangeArr = (xRange(graphDims.x0, graphDims.x1, (graphDims.x1 - graphDims.x0) / interval) );
    const linearPlot = xRangeArr.reduce(( acc, ele ) => {
        const yVal = graphDims.y1 - ( ( m * ( ele - graphDims.x0 )) + c /*- graphDims.x0*/);
        return yVal >= graphDims.y0 * 1.05 && ele <= graphDims.x1 * 0.95 ? (acc + ` L ${ele} ${yVal}`) : acc }, `M ${graphDims.x0} ${graphDims.y1 - c}`         
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
    plotLine.setAttribute('d', funcOfX(params.c, params.m, graphDims));
    plotLine.setAttribute('fill', 'transparent');
    plotLine.setAttribute('stroke', 'black');
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

