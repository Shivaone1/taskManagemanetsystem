<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    
    public function index()
    {
        try{
            $getData=Task::all();
            return response()->json(['status'=>true,'message'=>'Task Load Successfully!!!','data'=>$getData,],200);
        }catch(\Throwable $e){
            return response()->json(['status'=>false,'message'=>$e],400);
        }
    }

   
    public function store(Request $request)
    {
        //
    }

   
    public function show($id)
    {
        //
    }

  
    public function update(Request $request, $id)
    {
        //
    }

  
    public function destroy($id)
    {
        //
    }
}
