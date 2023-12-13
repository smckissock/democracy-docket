import { text, slugify } from "./shared.js";


export class Map {

    states = [
        { code: 'AK', priority: 0, name: 'Alaska', x: 0,  y: 0 },
        { code: 'ME', priority: 0, name: 'Maine', x: 10, y: 0 },

        { code: 'WI', priority: 0, name: 'Wisconsin', x: 5,  y: 1 },
        { code: 'VT', priority: 0, name: 'Vermont', x: 9,  y: 1 },
        { code: 'NH', priority: 0, name: 'New Hampshire', x: 10, y: 1 },

        { code: 'WA', priority: 0, name: 'Washington', x: 0,  y: 2 },
        { code: 'ID', priority: 0, name: 'Idaho', x: 1,  y: 2 },
        { code: 'MT', priority: 0, name: 'Montana', x: 2,  y: 2 },
        { code: 'ND', priority: 0, name: 'North Dakota', x: 3,  y: 2 },
        { code: 'MN', priority: 0, name: 'Minnesota', x: 4,  y: 2 },
        { code: 'IL', priority: 0, name: 'Illinois', x: 5,  y: 2 },
        { code: 'MI', priority: 0, name: 'Michigan', x: 6,  y: 2 },
        { code: 'NY', priority: 0, name: 'New York', x: 8,  y: 2 },
        { code: 'MA', priority: 0, name: 'Massachusetts', x: 9,  y: 2 },

        { code: 'OR', priority: 0, name: 'Oregon', x: 0,  y: 3 },
        { code: 'NV', priority: 0, name: 'Nevada', x: 1,  y: 3 },
        { code: 'WY', priority: 0, name: 'Wyoming', x: 2,  y: 3 },
        { code: 'SD', priority: 0, name: 'South Dakota', x: 3,  y: 3 },
        { code: 'IA', priority: 0, name: 'Iowa', x: 4,  y: 3 },
        { code: 'IN', priority: 0, name: 'Indiana', x: 5,  y: 3 },
        { code: 'OH', priority: 0, name: 'Ohio', x: 6,  y: 3 },
        { code: 'PA', priority: 0, name: 'Pennsylvania', x: 7,  y: 3 },
        { code: 'NJ', priority: 0, name: 'New Jersey', x: 8,  y: 3 },
        { code: 'CT', priority: 0, name: 'Connecticut', x: 9,  y: 3 },
        { code: 'RI', priority: 0, name: 'Rhode Island', x: 10, y: 3 },

        { code: 'CA', priority: 0, name: 'California', x: 0,  y: 4 },
        { code: 'UT', priority: 0, name: 'Utah', x: 1,  y: 4 },
        { code: 'CO', priority: 0, name: 'Colorado', x: 2,  y: 4 },
        { code: 'NE', priority: 0, name: 'Nebraska', x: 3,  y: 4 },
        { code: 'MO', priority: 0, name: 'Missouri', x: 4,  y: 4 },
        { code: 'KY', priority: 0, name: 'Kentucky', x: 5,  y: 4 },
        { code: 'WV', priority: 0, name: 'West Virginia', x: 6,  y: 4 },
        { code: 'VA', priority: 0, name: 'Virginia', x: 7,  y: 4 },
        { code: 'MD', priority: 0, name: 'Maryland', x: 8,  y: 4 },
        { code: 'DE', priority: 0, name: 'Delaware', x: 9,  y: 4 },

        { code: 'AZ', priority: 0, name: 'Arizona', x: 1,  y: 5 },
        { code: 'NM', priority: 0, name: 'New Mexico', x: 2,  y: 5 },
        { code: 'KS', priority: 0, name: 'Kansas', x: 3,  y: 5 },
        { code: 'AR', priority: 0, name: 'Arkansas', x: 4,  y: 5 },
        { code: 'TN', priority: 0, name: 'Tennessee', x: 5,  y: 5 },
        { code: 'SC', priority: 0, name: 'South Carolina', x: 6,  y: 5 },
        { code: 'NC', priority: 0, name: 'North Carolina', x: 7,  y: 5 },
        { code: 'DC', priority: 0, name: 'District of Columbia', x: 8,  y: 5 },

        { code: 'OK', priority: 0, name: 'Oklahoma', x: 3,  y: 6 },
        { code: 'LA', priority: 0, name: 'Louisiana', x: 4,  y: 6 },
        { code: 'MS', priority: 0, name: 'Mississippi', x: 5,  y: 6 },
        { code: 'AL', priority: 0, name: 'Alabama', x: 6,  y: 6 },
        { code: 'GA', priority: 0, name: 'Georgia', x: 7,  y: 6 },

        { code: 'HI', priority: 0, name: 'Hawaii', x: 0,  y: 7 },
        { code: 'TX', priority: 0, name: 'Texas', x: 3,  y: 7 },
        { code: 'FL', priority: 0, name: 'Florida', x: 8,  y: 7 }
    ];


    constructor(div, cases, dim, refresh) {
        self = this;
        self.div = div;
        self.cases = cases;
        self.dim = dim;
        self.refresh = refresh;

        // Add number of cases for each state 
        self.states.forEach(state => {
            state.caseCount = self.cases.filter(case_ => case_.state === state.name).length;
            state.colorIndex = Math.round((state.caseCount + 4) / 10);
            state.checked = false;
        });
        dc.states = self.states;
        self.show();
    }


    show() {
        self.makeMap(self);
    }

    selectState(state) {
        this.dim.filterAll();
        if (state.checked) {
            dc.states.forEach(aState => {
                if (state != aState) 
                    aState.checked = false;
            });
            this.dim.filter(state.name);
        }
        this.refresh();
    }

    makeMap(self) {

        function legend() {
            const legendColors = colors;
            const size = 14;
            
            const legendWidth = legendColors.length * (size + 2)
            const legendLeft = (svgWidth / 2) - (legendWidth / 2) + 40;

            mapSvg.selectAll(".legend_rect")
                .data(legendColors)
                .enter()
                .append("rect")
                    .attr("x", (d, i) => i * (size + 2) + legendLeft)
                    .attr("y", 5)
                    .attr("width", size)
                    .attr("height", size)
                    .attr("fill", (d, i) => legendColors[i])
                    .attr("stroke", "grey")
                    .attr("stroke-width", 0.5)
                    .attr("rx", cornerRadius - 2)
                    .attr("ry", cornerRadius - 2)
                    .classed(".legend_rect", true)

            //text("Priority Scale", mapSvg, "map-legend-title", legendLeft - 64, 18);
            //text("Low", mapSvg, "map-legend", legendLeft - 15, 18);
            //text("High", mapSvg, "map-legend", legendLeft + legendWidth, 18);
        }

        const size = 34;    // Width and height of squares
        const margin = 4;   // Pushes everything down and right
        const gap = 4;      // Space between squares

        this.colors = ["#ffffff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"]


        const cornerRadius = 2;
        const width = size - gap;
        const height = size - gap;
        const bottomMargin = 30

        let svgWidth = size * 11 + 2;
        let svgHeight = size * 8 + 2  + bottomMargin;

        this.mapSvg = d3.select("#chart-map")
            .append("svg")
            .attr("width", "100%")
            .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

        // Add rectangles for states
        this.mapSvg.selectAll("rect")
            .data(self.states)
            .enter()
            .append("rect")
                .attr("x", d => size * d.x + margin)
                .attr("y", d => size * d.y + margin)
                .attr("width", width)
                .attr("height", height)
                .attr("fill", d => this.colors[d.colorIndex])
                .attr("stroke", d => d.colorIndex == 0 ? "gray" : "black")
                .attr("stroke-width", d => d.colorIndex != 0 ? 1.0 : 0.5)
                .attr("rx", cornerRadius)
                .attr("ry", cornerRadius)
                .attr("cursor", d => d.priority == 0 ? "default" : "pointer")
                .on('mouseover', function(d) {
                    let rect = d3.select(this);
                    if (rect.datum().colorIndex > 0)
                        rect
                            .transition()
                            .duration(40)
                            .attr("stroke-width", 3.0)
                })
                .on('mouseout', function(d) {
                    d3.select(this)
                        .transition()
                        .duration(40)
                        .attr("stroke-width", d.colorIndex != 0 ? 1.0 : 0.5);
                })
                .on('click', function(d) {
                    let state = d3.select(this).datum();
                    state.checked = !state.checked;
                    if (state.caseCount > 0)
                        self.selectState(state);
                })

        // Add two-character codes on state squares
        this.mapSvg.selectAll("text")
            .data(self.states)
            .enter()
            .append("text")
                .attr("x", d => size * d.x + margin + 3)
                .attr("y", d => size * d.y + margin + 14)
                .text(d => d.code)
                .attr("font-size", "14px")
                .attr("font-weight", 500)
                .attr("fill", d => d.colorIndex > 2 ? "white" : "black")
                .attr("pointer-events", "none")

        // Add case counts on state squares
        this.mapSvg.selectAll("text.case-count")
            .data(self.states)
            .enter()
            .append("text")
                .attr("x", d => size * d.x + margin + 4 )
                .attr("y", d => size * d.y + margin + 26)
                .text(d => d.caseCount)
                .attr("pointer-events", "none")
                .classed("state-case-count", true)

        //legend();
    }

    update() {
        // Update number of cases for each state 
        let cases = dc.facts.allFiltered();
        self.states.forEach(state => {
            state.caseCount = cases.filter(case_ => case_.state === state.name).length;
            state.colorIndex = Math.round((state.caseCount + 4) / 10);
        });

        this.mapSvg.selectAll("rect")
            .transition()
                .duration(500)
                .attr("fill", state => this.colors[state.colorIndex])
            
        this.mapSvg.selectAll("text")
            .transition()
                .duration(500)
                .attr("fill", d => d.colorIndex > 2 ? "white" : "black");

        this.mapSvg.selectAll("text.state-case-count")
            .transition()
                .duration(500)
                .text(d => d.caseCount !== 0 ? d.caseCount : "")
                .attr("fill", d => d.colorIndex > 2 ? "white" : "black");
    }
}
