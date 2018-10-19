<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pusher\Pusher;
use TonchikTm\PdfToHtml\Pdf;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     * @throws \Pusher\PusherException
     */
    public function authenticate(Request $request)
    {
        $socketId    = $request->get('socket_id');
        $channelName = $request->get('channel_name');

        $pusher = new Pusher(
            env('PUSHER_APP_KEY'), env('PUSHER_APP_SECRET'), env('PUSHER_APP_ID'), [
                                     'cluster'   => env('PUSHER_APP_CLUSTER'),
                                     'encrypted' => true,
                                 ]
        );

        $presenceData = [
            'name' => auth()->user()->name,
        ];
        $key          = $pusher->presence_auth($channelName, $socketId, auth()->user()->id, $presenceData);

        return response($key);
    }

    public function testPdf(Request $request) {
        $file = $request->file('image');
        $p = new Pdf($file, [
            'pdftohtml_path' => '/usr/bin/pdftohtml', // đường dẫn của `pdf to html` sau khi cài đặt
            'pdfinfo_path' => '/usr/bin/pdfinfo', // đường dẫn của `pdf info` sau khi cài đặt
            'clearAfter' => false, // xóa file pdf sau khi convert - mặc định là true
            'outputDir' => storage_path('app/ebooks'), // thư mục output của file html
        ]);
        $text = $p->getHtml()->getPage(1);
        $text = preg_replace('/(?:[^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff]+(?![^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff])|\"[^\\\\\x80-\xff\n\015\"]*(?:\\\\[^\x80-\xff][^\\\\\x80-\xff\n\015\"]*)*\")(?:\.(?:[^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff]+(?![^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff])|\"[^\\\\\x80-\xff\n\015\"]*(?:\\\\[^\x80-\xff][^\\\\\x80-\xff\n\015\"]*)*\"))*@(?:[^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff]+(?![^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff])|\[(?:[^\\\\\x80-\xff\n\015\[\]]|\\\\[^\x80-\xff])*\])(?:\.(?:[^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff]+(?![^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff])|\[(?:[^\\\\\x80-\xff\n\015\[\]]|\\\\[^\x80-\xff])*\]))*/' , '************' , $text);
        $text = preg_replace('/\d{10}/', '***********', $text);
        $myfile = fopen(storage_path('app/ebooks').'/monmonmon.html', 'w');
        fwrite($myfile, $text);
        fclose($myfile);
        return response()->json([
            'test' => str_replace('0333087259', '', $text),
            'moto' => $text,
        ]);
    }
}
