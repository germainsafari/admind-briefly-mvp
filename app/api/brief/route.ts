import { NextRequest, NextResponse } from 'next/server'
import { Pool } from '@neondatabase/serverless'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // 1) Make sure your payload uses exactly “project_kpi” everywhere:
    //    If you ever sent “project_k_p_i” or typo’d that key, remove/rename it.
    if (!data.project_name || !data.project_type || !data.project_kpi) {
      return NextResponse.json(
        { error: 'Missing required: project_name, project_type, project_kpi' },
        { status: 400 }
      )
    }

    // 2) Build the INSERT dynamically, but JSON-arrays need to be real JS arrays
    //    so node-postgres will map them to Postgres text[]/jsonb[] properly:
    const fields = [
      'project_name',
      'project_type',
      'project_description',
      'business_goals',
      'communication_goals',
      'project_kpi',
      'challenge',
      'timeline_expectations',
      'project_budget',
      'agency_scope',
      'mandatories',
      'technical_requirements',
      'target_audience',
      'internal_stakeholders',
      'consumer_insight',
      'rtb_features',
      'key_message',
      'value_proposition',
      'tone_of_voice',
      'market_competition',
      'inspirations',
      'past_communication',
      'touchpoints',
      'final_notes',
      'attachments',   // must be a JS array
      'links',         // must be a JS array
      'creator_id',
      'client_id',
      'organization_id',
      'status',
      'progress',
    ]

    const columns: string[] = []
    const placeholders: string[] = []
    const values: any[] = []
    let idx = 1

    for (const key of fields) {
      if (data[key] !== undefined) {
        columns.push(`"${key}"`)
        placeholders.push(`$${idx}`)
        values.push(data[key])
        idx++
      }
    }

    // 3) Final SQL
    const sql = `
      INSERT INTO briefs (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *
    `
    const { rows } = await pool.query(sql, values)

    return NextResponse.json(rows[0], { status: 201 })
  } catch (err: any) {
    console.error('Error saving brief:', err)
    return NextResponse.json(
      { error: 'Failed to save brief', details: err.message },
      { status: 500 }
    )
  }
}
