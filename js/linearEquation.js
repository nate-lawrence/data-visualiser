const params = {
    c: 0,
    m: 1,
}


const funcOfX = (c, m, graphDims, interval = 100) => {    
    const xRange = (start, stop, step) => {
        const xRangeArr = Array.from({length: ( stop - start ) / step + 1}, (_, i) => start + (i * step) );
        return xRangeArr;
    };

    const xRangeArr = (xRange(graphDims.x0, graphDims.x1, (graphDims.x1 - graphDims.x0) / interval) );
    console.log(xRangeArr);
    const linearPlot = xRangeArr.reduce(( acc, ele ) => {
        const yVal = graphDims.y1 - ( ( m * ele ) + c - graphDims.x0);
        return acc + ` L ${ele} ${yVal}`}, `M ${graphDims.x0} ${graphDims.y1}`         
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
    axis.setAttribute('d' , `M ${graphDims.x0} ${graphDims.y0} V ${graphDims.y1} H ${graphDims.x1}`);
    axis.setAttribute('fill', 'transparent');
    axis.setAttribute('stroke', 'black')
    gPlot.append(axis);
    
    const plotLine = document.createElementNS('http://www.w3.org/2000/svg','path');
    plotLine.setAttribute('d', funcOfX(0, 1, graphDims));
    plotLine.setAttribute('fill', 'transparent');
    plotLine.setAttribute('stroke', 'black');
    gPlot.append(plotLine);

    return gPlot;
}
const newSVG = svgGen('newPlot', visPanel.offsetWidth, visPanel.offsetHeight);

const graphDims = {
    x0: 50,
    x1: 250,
    y0: 10,
    y1: 225
}

const graph = graphArea(graphDims);

newSVG.append(graph);
visPanel.append(newSVG);

