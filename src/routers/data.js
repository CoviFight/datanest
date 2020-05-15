const express = require('express')
const router = new express.Router()
const Collection = require('../models/collection')
const Table = require('../models/table')
const tableEntry = require('../models/tableEntry')
const auth = require('../middleware/auth')

router.post('/collections', auth, async (req, res) => {
    const collection = new Collection({
        "owner": req.user._id
    })

    try {
        await collection.save()
        res.status(201).send(collection)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.post('/collections/:id/tables', auth, async (req, res) => {
    const collection_id = req.params.id

    const table = new Table({
        ...req.body,
        "belongsTo": collection_id
    })

    try {
        await table.save()
        res.status(201).send(table)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/collections/tables/:id', auth, async (req, res) => {
    const table_id = req.params.id

    const table = await Table.findOne({ "_id":table_id })

    if (req.body.numValues !== table.numColumns) {
        return res.status(400).send('Number of values in entry should be equal to number of columns in table')
    }

    const entry = new tableEntry({
        ...req.body,
        "table": table._id
    })

    try {
        await entry.save()
        res.status(201).send(entry)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/collections', auth, async (req, res) => {
    try {
        await req.user.populate("Collection").execPopulate()
        await req.user.Collection[0].populate("Table").execPopulate()

        const tables = req.user.Collection[0].Table

        const result = []
        for (const table of req.user.Collection[0].Table) {
            await table.populate("tableEntry").execPopulate()
            result.push({"name": table.name,
                         "entries": table.tableEntry})
        }


        res.send(result)

    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router