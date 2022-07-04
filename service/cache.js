import NodeCache from "../service/NodeCache.js";
if (!NodeCache.has("tickets")) {
    NodeCache.set("tickets", []);
}

export function cache() {
    const self = {
        query: null,
        get: function (collection) {
            this.query = NodeCache.get(collection);
            return this;
        },
        map: function (property) {
            this.query.map((obj) => obj[property]);
            return this;
        },
        filter: function (property, value) {
            this.query.filter((obj) => obj[property] === value);
            return this;
        },
        airlines: function () {
            this.query = NodeCache.get("airlines");
            return this.query;
        },
        tickets: function () {
            return NodeCache.get("tickets");;
        },
        updateTicketsByID: function (IDs, property, value) {
            NodeCache.data.tickets.v.forEach(ticket => {
                if (IDs.includes(ticket.ticketId)) {
                    ticket[property] = value
                }
            })
        },
        addTicket: function (ticket) {
            this.query = NodeCache.data.tickets.v.push(ticket);
        },
        build: function () {
            return this.query;
        }
    };
    return self
};

