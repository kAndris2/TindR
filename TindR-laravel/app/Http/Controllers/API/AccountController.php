<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AccountService;

class AccountController extends Controller
{
    private $accountService;

    public function __construct() {
        $this->accountService = new AccountService();
    }

    public function getAccountById($id) 
    {
        return $this->accountService->getAccountById($id);
    }

    public function register(Request $request) 
    {
        return $this->accountService->register($request);
    }

    public function login(Request $request)
    {
        return $this->accountService->login($request);
    }

    public function updateAccount(Request $request, $id)
    {
        $this->accountService->updateAccount($request, $id);
    }

    public function deleteAccount($id)
    {
        $this->accountService->deleteAccount($id);
    }

    public function isValidEmail($email) 
    {
        return $this->accountService->isValidEmail($email);
    }

    public function getDetails($id)
    {
        return $this->accountService->getDetails($id);
    }

    public function savePosition($id, Request $request) 
    {
        $this->accountService->savePosition($id, $request);
    }
}
