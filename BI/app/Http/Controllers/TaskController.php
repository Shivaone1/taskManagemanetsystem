<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


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
            return response()->json(['status' => false, 'message' => 'Failed Something Went Wrong!!!' . $e->getmessage()], 400); // Adjusted error response message
        }
    }


    public function loginUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors()->first();
            return response()->json(['status' => false, 'message' => $errors], 400);
        }

        try {
            $login = $request->all();
            Auth::attempt($login);
            $user = Auth::user();
            $getData = [
                'status' => true,
                'message' => 'Login Successfully!!!',
                'data' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ];
            return response($getData);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => 'Login Failed !!!' . $th], 400);
        }
    }


    public function createUser(Request $request)
    {
        $validation = validator::make($request->all(), [
            "email" => 'required|email',
            "password"  => 'required|min:8'
        ]);
        if ($validation->fails()) {
            $errors = $validation->errors();
            return response()->json(['status' => false, 'message' => $errors], 403);
        }
        User::create([
            "name" => 'Admin',
            "role" => '1',
            "email"    => $request->email,
            "password" => bcrypt($request->password),
        ]);
        return response()->json(['status' => true, 'message' => 'Login User Created Successfully...'], 200);
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
            return response()->json(['status' => false, 'message' => 'Failed Something Went Wrong!!!' . $e->getmessage()], 400);
        }
    }
}
