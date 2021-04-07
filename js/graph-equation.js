// Paramaters to define the graph - Manually entering this paramater data for development purposes
// TODO: receive paramater values from user input in the UI
const graphParams = [{
    svgGroup: 'svg-group-1',
    groupParams: {
        graphName: 'graph-0',
        funcParams: {
            a: [1,2],
            b: [0],
        },
        plotParams: {
            interval: 100,
        },
        groupDims: {
            x0: 10,
            x1: 250,
            y0: 10,
            y1: 250,
        },
        axis: {
            gAxisDims: {
                x0: 20,
                x1: 250,
                y0: 20,
                y1: 250,
            },
            axesRange: {
                xAxisRange: [-5, 5],
                yAxisRange: [-5, 5],
            },
            formatting: {
                xAxisPosition: 'default',
                yAxisPosition: 'default',            
            },
        },            
    },
}];

// Generate separate elements forming the graph - the plotline, and the axis
const graphGen = (graphParams) => {
    // These variables are common across multiple element generators
    const xAxisRange = graphParams.axis.axesRange.xAxisRange;
    const yAxisRange = graphParams.axis.axesRange.yAxisRange;
    // This function generates the 2d representation of f(x) on the graph, the dimensions of the graph
    // as defined in the 'graphParams'
    const plotFunction = (graphParams, xAxisRange, yAxisRange) => {
        const xAxisMax = Math.max(...xAxisRange);
        const xAxisMin = Math.min(...xAxisRange);
        const yAxisMax = Math.max(...yAxisRange);
        const yAxisMin = Math.min(...yAxisRange);
        const plotDims = graphParams.axis.gAxisDims;
        const funcParams = graphParams.funcParams;
        const xPxRatio = (plotDims.x1 - plotDims.x0) / (xAxisMax - xAxisMin);
        const yPxRatio = (plotDims.y1 - plotDims.y0) / (yAxisMax - yAxisMin);
        // A standard range generating function, outputs a new array of elements, each i incremented by one 'step',
        // and bound by the specified min and max values
        const range = (start, stop, step) => {
            const rangeArray = Array.from({length: ( stop - start ) / step}, (_, i) => start + (i * step) );
            return rangeArray;
        };        
        const xPlotPoints = range(xAxisMin, xAxisMax, (xAxisMax - xAxisMin) / graphParams.plotParams.interval);
        // Converts each plot point on each axis as specified by the scale, to the corresponding point in pixels within the SVG div
        // The Y value is calculated as a function of x using the linear/polynomial function
        // TODO: Allow for n factor polynomials by iterating over values
        const plotPointsToDisplay = xPlotPoints.reduce( (acc, ele) => {
            const yPlotPoint = plotDims.y1 - (((( funcParams.a[0] * Math.pow( ele, funcParams.a[1] ) + funcParams.b[0] ) - yAxisMin) * yPxRatio) /*+ plotDims.y0*/);
            const xPlotPoint = (( ele - xAxisMin) * xPxRatio) + plotDims.x0;
            return ( [...acc, [xPlotPoint, yPlotPoint]] )
        }, [] );
        // Converts the coordinates to syntax that can be parsed by the 'path' element
        const plotLine = plotPointsToDisplay.map( (e, i, a) => {
            return i === 0
                ? `M ${e[0]} ${e[1]} `
                : `L ${e[0]} ${e[1]} `
        });
        return plotLine;
    };        
    // Converts location of each axis line as specified by the scale, to the corresponding point in pixels wihtin the SVG div
    const axisPointDimRange = (xPoint, yPoint, graphParams, xAxisRange, yAxisRange) => {
        const axisDims = graphParams.axis.gAxisDims;
        const xAxisDimInitPoints = [axisDims.x0, axisDims.y1 - ((xPoint - Math.min(...yAxisRange)) / (Math.abs(yAxisRange[0]) + Math.abs(yAxisRange[1])) * (axisDims.y1 - axisDims.y0))];
        const yAxisDimInitPoints = [(yPoint - Math.min(...xAxisRange)) / (Math.abs(xAxisRange[0]) + Math.abs(xAxisRange[1])) * (axisDims.x1 - axisDims.x0) + axisDims.x0, axisDims.y0];
        const xAxisEndPoints = [axisDims.x1, xAxisDimInitPoints[1]]
        const yAxisEndPoints = [yAxisDimInitPoints[0], axisDims.y1];
        return {xAxisInitPoints: xAxisDimInitPoints, yAxisInitPoints: yAxisDimInitPoints, xAxisEndPoints: xAxisEndPoints, yAxisEndPoints: yAxisEndPoints};
    };
    const plotLine = plotFunction(graphParams, xAxisRange, yAxisRange);
    const axisPoints = axisPointDimRange(0, 0, graphParams, xAxisRange, yAxisRange);
    // return the results of each element generator as an object key pair
    return {axisPoints: axisPoints, plotLine: plotLine};
};
// The result of the generated graph elements, returned as an object key pair    
const graphElements = graphGen(graphParams[0].groupParams);

// Attaching the elements to the DOM and setting the attributes to display the graph in SVG
// TODO: clean this up and wrap each step in distinct functions
const parentNode = document.querySelector('#visualise-panel');
const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgNode.setAttribute('width', parentNode.offsetWidth);
svgNode.setAttribute('height', parentNode.offsetHeight);
const groupNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
groupNode.setAttribute('stroke', 'black');
groupNode.setAttribute('fill', 'transparent');
const xPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
xPath.setAttribute('d', `M ${graphElements.axisPoints.xAxisInitPoints[0]} ${graphElements.axisPoints.xAxisInitPoints[1]} L ${graphElements.axisPoints.xAxisEndPoints[0]} ${graphElements.axisPoints.xAxisEndPoints[1]}`)
const yPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
yPath.setAttribute('d', `M ${graphElements.axisPoints.yAxisInitPoints[0]} ${graphElements.axisPoints.yAxisInitPoints[1]} L ${graphElements.axisPoints.yAxisEndPoints[0]} ${graphElements.axisPoints.yAxisEndPoints[1]}`)
const plotPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
plotPath.setAttribute('d', graphElements.plotLine.join(''));
plotPath.setAttribute('stroke', 'darkred');

groupNode.append(...[xPath, yPath, plotPath]);
svgNode.append(groupNode);
parentNode.append(svgNode);