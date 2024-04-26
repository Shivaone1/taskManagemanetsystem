<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{

    public function index()
    {
        try {
            $getData = Task::orderBy('id', 'desc')->get();
            return response()->json(['status' => true, 'message' => 'Task Load Successfully!!!', 'data' => $getData,], 200);
        } catch (\Throwable $e) {
            return response()->json(['status' => false, 'message' => $e], 400);
        }
    }


    public function store(Request $request)
    {
        try {
            $task = new Task;
            $task->title = $request->title;
            $task->description = $request->description;
            $task->status = $request->status;
            $task->deadline = $request->deadline;
            $task->save();
            return response()->json(['status' => true, 'message' => 'Task Created Successfully!!!'], 200);
        } catch (\Throwable $e) {
            return response()->json(['status' => false, 'message' => 'Failed Something Went Wrong!!!' . $e->getMessage()], 400); // Adjusted error response message
        }
    }


    public function show($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy(Request $request)
    {
        try {
            $validation = validator::make($request->all(), [
                'task_id' => 'required'
            ]);
            if ($validation->fails()) {
                $errors = $validation->errors();
                return response()->json(['status' => false, 'message' => $errors], 400);
            }
            $getTask = Task::find($request->task_id, 'id');
            $getTask->delete();
            return response()->json(['status' => true, 'message' => 'Task Delete Successfully !!!'. $getTask->title]);
        } catch (\Throwable $e) {
            return response()->json(['status' => false, 'message' => 'Failed Something Went Wrong!!!' . $e->getMessage()], 400);
        }
    }
}
