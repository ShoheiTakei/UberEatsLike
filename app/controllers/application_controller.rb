class ApplicationController < ActionController::API
    # 要は全てのAPI controllerの処理のbefore_actionとしてfake_loadを実行するというものです。
    # sleep(1)は1秒だけプログラムの実行を止めるという意味です。
    before_action :fake_load

    def fake_load
        sleep(1)
    end
end
