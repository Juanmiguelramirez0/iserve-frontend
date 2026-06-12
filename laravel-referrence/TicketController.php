<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Get all tickets
     * Route: GET /api/tickets
     */
    public function index()
    {
        return response()->json(Ticket::orderBy('created_at', 'desc')->get());
    }

    /**
     * Store a new ticket
     * Route: POST /api/tickets
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|string',
            'status' => 'required|string',
            'user' => 'required|string',
            'dept' => 'required|string',
            'userId' => 'nullable|string',
        ]);

        $ticket = Ticket::create($validated);

        return response()->json($ticket, 201);
    }
}
