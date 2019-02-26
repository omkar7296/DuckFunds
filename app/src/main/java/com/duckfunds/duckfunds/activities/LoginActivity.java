package com.duckfunds.duckfunds.activities;

import android.content.Intent;
import android.media.Image;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.duckfunds.duckfunds.R;
import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.GoogleApiClient;

import butterknife.BindView;
import butterknife.ButterKnife;

public class LoginActivity extends AppCompatActivity implements GoogleApiClient.OnConnectionFailedListener {

    private ImageView signIn;
    private static GoogleApiClient googleApiClient;
    String memail;
    String mImgURL;
    String mdisplayName;

    LinearLayout landing_activity_parent_layout;
    ProgressBar landing_activity_progressbar;

    public static GoogleApiClient getGoogleApiClient() {
        return googleApiClient;
    }

    private static final int REQ_CODE = 1;

    @BindView(R.id.google_sign_in_button)
    ImageView googleSignInButton;

    @BindView(R.id.sign_in_activity_progressbar)
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_NO_TITLE); //will hide the title
        getSupportActionBar().hide(); // hide the title bar
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN); //enable full screen

        setContentView(R.layout.activity_login);

        ButterKnife.bind(this);

        if (getGoogleApiClient() != null && getGoogleApiClient().isConnected()) {

            Log.i("User", "Signed In");

            //memail = account.getEmail();
        } else {
            // not signed in. Show the "sign in" button and explanation.
            // ...
        }

        GoogleSignInOptions signInOptions = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestEmail().build();
        googleApiClient = new GoogleApiClient.Builder(this).enableAutoManage(this,this).addApi(Auth.GOOGLE_SIGN_IN_API,signInOptions).build();

        googleSignInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = Auth.GoogleSignInApi.getSignInIntent(googleApiClient);
                startActivityForResult(intent,REQ_CODE);
            }
        });

    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
        Toast.makeText(this, "Google Signin Failed --", Toast.LENGTH_SHORT).show();
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == REQ_CODE)
        {
            GoogleSignInResult result = Auth.GoogleSignInApi.getSignInResultFromIntent(data);
            handleResult(result);
        }

    }

    private void handleResult(GoogleSignInResult googleSignInResult)
    {
        if(googleSignInResult.isSuccess()) {
            GoogleSignInAccount account = googleSignInResult.getSignInAccount();

            memail = account.getEmail();


            if (account.getPhotoUrl() == null) {
                mImgURL = "https://worldarts2015.s3-us-west-2.amazonaws.com/images/default-profile-picture.jpg?cache=1473463677";
            } else {
                mImgURL = account.getPhotoUrl().toString();
            }

            mdisplayName = account.getDisplayName();

            String type = "check_user_account";

            Intent intent = new Intent(LoginActivity.this,MainActivity.class);
            intent.putExtra("name",mdisplayName);
            intent.putExtra("email",memail);

            Log.i("User name", mdisplayName);
            Log.i("User email", memail);
//            intent.putExtra("imgURL",imgURL);
//            intent.putExtra("familyName",familyName);
//            intent.putExtra("givenName",givenName);
            startActivity(intent);
            finish();

        }
        else
        {
            Toast.makeText(this, "Google Signin Failed", Toast.LENGTH_SHORT).show();
        }
    }
}
