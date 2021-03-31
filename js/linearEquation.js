const params = {
    c: 0,
    m: 1,
}


const funcOfX = (c, m, initX, initY, maxXDim, maxYDim) => {    
    //const ratioXY = initYDim / initXDim;
    //console.log(ratioXY);
    let dPlot = `M ${initX} ${maxYDim - initY}`;    
    for (i = initX; i <= maxXDim; i += 0.1 ) {
        let y = maxYDim - ((( m * i ) + c)  );
        dPlot = y <= maxYDim ? (dPlot + ` L ${i} ${y}`) : dPlot;            
    }
    return dPlot;
}

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
    const plotWidth = Math.min(300, width * 0.8);
    const plotHeight = Math.max(300, height * 0.8);    
    const gPlot = document.createElementNS('http://www.w3.org/2000/svg','g');
    gPlot.setAttribute('id', 'graph-1');

    const axis = document.createElementNS('http://www.w3.org/2000/svg','path');
    axis.setAttribute('d' , `M ${initX} ${initY} V ${plotHeight} H ${plotWidth}`);
    axis.setAttribute('fill', 'transparent');
    axis.setAttribute('stroke', 'black')
    //gPlot.append(axis);
    
    const plotLine = document.createElementNS('http://www.w3.org/2000/svg','path');
    plotLine.setAttribute('d', `M ${initX} ${plotHeight}${funcOfX(params.c, params.m, initX, initY, plotWidth, plotHeight)}`)
    plotLine.setAttribute('fill', 'transparent');
    plotLine.setAttribute('stroke', 'black');
    gPlot.append(plotLine);

    return gPlot;
}
const newSVG = svgGen('newPlot', visPanel.offsetWidth, visPanel.offsetHeight);

const graphDims = {
    x0: 0,
    x1: 250,
    y0: 0,
    y1: 250
}

const graph = graphArea(graphDims);

newSVG.append(graph);
visPanel.append(newSVG);

