import React, { useEffect } from 'react'
import * as d3 from 'd3'

const HEIGHT = 600
const WIDTH = 800
const MARGIN_BOTTOM = 20
const MARGIN_LEFT = 40

let graph
let xAxis
let yAxis

export default function Graph({ envelopes = [] }) {

  useEffect(() => {
    graph = d3.select('#balance-graph')
      .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
      .append('g')

    xAxis = graph
      .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(${MARGIN_LEFT}, ${HEIGHT - MARGIN_BOTTOM})`)

    yAxis = graph
      .append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${MARGIN_LEFT}, 0)`)

  }, [])


  useEffect(() => {
    if (!graph) return

    const allTransactions = envelopes.flatMap(envelope => envelope.transactions)

    const allDates = allTransactions.map(transaction => transaction.date)
    const earliestDate = Math.min(...allDates)
    const latestDate = Math.max(...allDates)

    const allBalances = allTransactions.map(transaction => transaction.balance)
    const minAmount = Math.min(...allBalances)
    const maxAmount = Math.max(...allBalances)

    const xScale = d3.scaleTime()
      .domain([earliestDate, latestDate])
      .range([0, WIDTH - MARGIN_LEFT]); 

    const yScale = d3.scaleLinear()
      .domain([minAmount - 10, maxAmount + 10])
      .range([HEIGHT - MARGIN_BOTTOM, 0]);

    const line = d3.line()
                  .x(({date}) => xScale(date))
                  .y(({balance}) => yScale(balance))

    xAxis.call(d3.axisBottom(xScale))
    yAxis.call(d3.axisLeft(yScale))

    graph.selectAll('path.line').remove()

    envelopes.forEach((envelope) => {
      graph
        .append('path')
          .datum(envelope.transactions)
          .attr('class', 'line')
          .attr('d', line)
          .attr('transform', `translate(${MARGIN_LEFT})`)
          .attr('stroke', envelope.colour)
    })

  }, [envelopes])

  return <div id="balance-graph" />
}