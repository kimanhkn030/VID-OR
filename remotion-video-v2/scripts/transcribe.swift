import Foundation
import Speech

let arguments = CommandLine.arguments
guard arguments.count >= 2 else {
  fputs("Usage: transcribe <audio-path> [locale]\n", stderr)
  exit(2)
}

let audioURL = URL(fileURLWithPath: arguments[1])
let locale = Locale(identifier: arguments.count >= 3 ? arguments[2] : "vi-VN")

let semaphore = DispatchSemaphore(value: 0)
var exitCode: Int32 = 1

func runRecognition() {
  guard let recognizer = SFSpeechRecognizer(locale: locale) else {
    fputs("Speech recognizer unavailable for locale \(locale.identifier)\n", stderr)
    semaphore.signal()
    return
  }

  let request = SFSpeechURLRecognitionRequest(url: audioURL)
  request.shouldReportPartialResults = false
  request.requiresOnDeviceRecognition = false
  request.addsPunctuation = true

  recognizer.recognitionTask(with: request) { result, error in
    if let result = result, result.isFinal {
      for segment in result.bestTranscription.segments {
        print(String(format: "%.3f\t%.3f\t%@", segment.timestamp, segment.duration, segment.substring))
      }
      exitCode = 0
      semaphore.signal()
      return
    }

    if let error = error {
      fputs("Recognition failed: \(error.localizedDescription)\n", stderr)
      semaphore.signal()
    }
  }
}

let status = SFSpeechRecognizer.authorizationStatus()
if status == .authorized {
  runRecognition()
} else if status == .notDetermined {
  SFSpeechRecognizer.requestAuthorization { newStatus in
    if newStatus == .authorized {
      runRecognition()
    } else {
      fputs("Speech authorization status: \(newStatus.rawValue)\n", stderr)
      semaphore.signal()
    }
  }
} else {
  fputs("Speech authorization status: \(status.rawValue)\n", stderr)
  semaphore.signal()
}

_ = semaphore.wait(timeout: .now() + 120)
exit(exitCode)
